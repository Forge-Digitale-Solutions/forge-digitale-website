import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  contentRangeHeader,
  planFileUpload,
  splitChunks,
} from "./chunking";
import { INBOX_INIT_URL, uploadInboxDraft } from "./inbox";

const MB = 1024 * 1024;

describe("chunk plan", () => {
  it("uploads a file under 5 MB as a single chunk", () => {
    const size = 4_194_304;
    const plan = planFileUpload(size);
    assert.equal(plan.chunkSize, size);
    assert.equal(plan.totalChunkCount, 1);
    assert.deepEqual(plan.ranges, [{ start: 0, end: size - 1, length: size }]);
    assert.equal(contentRangeHeader(0, size - 1, size), "bytes 0-4194303/4194304");
    assert.equal(planFileUpload(5 * MB - 1).totalChunkCount, 1);
  });

  it("keeps files up to 64 MB in one chunk and splits anything larger", () => {
    assert.equal(planFileUpload(64 * MB).totalChunkCount, 1);
    assert.equal(planFileUpload(5 * MB).totalChunkCount, 1);
    const size = 64 * MB + 1;
    const plan = planFileUpload(size);
    assert.equal(plan.chunkSize, 10_000_000);
    assert.equal(plan.totalChunkCount, Math.floor(size / 10_000_000));
    assert.ok(plan.totalChunkCount >= 2);
    assert.equal(
      plan.ranges.reduce((sum, range) => sum + range.length, 0),
      size,
    );
    assert.equal(plan.ranges[0].length, 10_000_000);
    assert.ok(plan.ranges[plan.ranges.length - 1].length >= 5 * MB);
    assert.ok(plan.ranges[plan.ranges.length - 1].length <= 128 * MB);
  });

  it("matches the documented 10 MB chunk boundaries", () => {
    const ranges = splitChunks(50_000_123, 10_000_000);
    assert.deepEqual(
      ranges.map((range) => [range.start, range.end, range.length]),
      [
        [0, 9_999_999, 10_000_000],
        [10_000_000, 19_999_999, 10_000_000],
        [20_000_000, 29_999_999, 10_000_000],
        [30_000_000, 39_999_999, 10_000_000],
        [40_000_000, 50_000_122, 10_000_123],
      ],
    );
    assert.equal(
      contentRangeHeader(40_000_000, 50_000_122, 50_000_123),
      "bytes 40000000-50000122/50000123",
    );
  });

  it("rejects an empty, fractional, or oversized video", () => {
    assert.throws(() => planFileUpload(0));
    assert.throws(() => planFileUpload(-1));
    assert.throws(() => planFileUpload(1.5));
    assert.throws(() => planFileUpload(4 * 1024 * 1024 * 1024 + 1));
  });
});

describe("inbox upload", () => {
  it("inits a FILE_UPLOAD draft and PUTs the Content-Range", async () => {
    const size = 32;
    const calls: Array<{ url: string; method: string; range: string | null; length: number }> = [];
    const fetchImpl: typeof fetch = async (input, init) => {
      const url = String(input);
      const headers = new Headers(init?.headers);
      const body = init?.body;
      calls.push({
        url,
        method: init?.method ?? "GET",
        range: headers.get("content-range"),
        length: body instanceof Uint8Array ? body.byteLength : 0,
      });
      if (url === INBOX_INIT_URL) {
        const payload = JSON.parse(String(init?.body)) as {
          source_info: {
            source: string;
            video_size: number;
            chunk_size: number;
            total_chunk_count: number;
          };
        };
        assert.equal(payload.source_info.source, "FILE_UPLOAD");
        assert.equal(payload.source_info.video_size, size);
        assert.equal(payload.source_info.chunk_size, size);
        assert.equal(payload.source_info.total_chunk_count, 1);
        assert.equal(headers.get("authorization"), "Bearer act.TOKEN");
        return new Response(
          JSON.stringify({
            data: {
              publish_id: "v_inbox_file~v2.1",
              upload_url: "https://open-upload.tiktokapis.com/video/?upload_id=1&upload_token=t",
            },
            error: { code: "ok", message: "", log_id: "x" },
          }),
          { status: 200 },
        );
      }
      assert.equal(headers.get("content-type"), "video/mp4");
      assert.equal(headers.get("content-range"), `bytes 0-${size - 1}/${size}`);
      return new Response(null, { status: 201 });
    };

    const result = await uploadInboxDraft({
      videoSize: size,
      accessToken: "act.TOKEN",
      fetchImpl,
      read: async (start, length) => new Uint8Array(length).fill(start),
    });
    assert.equal(result.publishId, "v_inbox_file~v2.1");
    assert.equal(calls[0].url, INBOX_INIT_URL);
    assert.equal(calls[1].range, `bytes 0-${size - 1}/${size}`);
    assert.equal(calls[1].length, size);
    assert.equal(calls.some((call) => call.url.includes("/v2/post/publish/video/init/")), false);
  });

  it("retries a 5xx chunk and refuses a non-TikTok upload URL", async () => {
    let puts = 0;
    let pauses = 0;
    const fetchImpl: typeof fetch = async (input, init) => {
      if (String(input) === INBOX_INIT_URL) {
        return new Response(
          JSON.stringify({
            data: {
              publish_id: "v_inbox_file~v2.2",
              upload_url: "https://open-upload.tiktokapis.com/video/?upload_id=2",
            },
            error: { code: "ok", message: "", log_id: "x" },
          }),
          { status: 200 },
        );
      }
      puts += 1;
      if (puts === 1) return new Response(null, { status: 503 });
      assert.equal(new Headers(init?.headers).get("content-range"), "bytes 0-7/8");
      return new Response(null, { status: 201 });
    };
    const result = await uploadInboxDraft({
      videoSize: 8,
      accessToken: "act.TOKEN",
      fetchImpl,
      pause: async () => {
        pauses += 1;
      },
      read: async (_start, length) => new Uint8Array(length),
    });
    assert.equal(result.publishId, "v_inbox_file~v2.2");
    assert.equal(puts, 2);
    assert.equal(pauses, 1);

    const blocked: typeof fetch = async () =>
      new Response(
        JSON.stringify({
          data: {
            publish_id: "v_inbox_file~v2.3",
            upload_url: "https://evil.example/upload",
          },
          error: { code: "ok", message: "", log_id: "x" },
        }),
        { status: 200 },
      );
    await assert.rejects(() =>
      uploadInboxDraft({
        videoSize: 4,
        accessToken: "act.TOKEN",
        fetchImpl: blocked,
        read: async (_start, length) => new Uint8Array(length),
      }),
    );
  });

  it("sends 206 for every chunk except the last 201", async () => {
    const size = 64 * MB + 1;
    const plan = planFileUpload(size);
    const statuses: number[] = [];
    const fetchImpl: typeof fetch = async (input, init) => {
      if (String(input) === INBOX_INIT_URL) {
        const payload = JSON.parse(String(init?.body)) as {
          source_info: { chunk_size: number; total_chunk_count: number };
        };
        assert.equal(payload.source_info.chunk_size, plan.chunkSize);
        assert.equal(payload.source_info.total_chunk_count, plan.totalChunkCount);
        return new Response(
          JSON.stringify({
            data: {
              publish_id: "v_inbox_file~v2.4",
              upload_url: "https://upload.us.tiktokapis.com/video/?upload_id=4",
            },
            error: { code: "ok", message: "", log_id: "x" },
          }),
          { status: 200 },
        );
      }
      const range = new Headers(init?.headers).get("content-range") ?? "";
      const match = /bytes (\d+)-(\d+)\/(\d+)/.exec(range);
      assert.ok(match);
      const end = Number(match[2]);
      const total = Number(match[3]);
      const status = end + 1 === total ? 201 : 206;
      statuses.push(status);
      return new Response(null, { status });
    };
    await uploadInboxDraft({
      videoSize: size,
      accessToken: "act.TOKEN",
      fetchImpl,
      read: async (_start, length) => new Uint8Array(length),
    });
    assert.equal(statuses.length, plan.totalChunkCount);
    assert.deepEqual(statuses.slice(0, -1), Array(statuses.length - 1).fill(206));
    assert.equal(statuses[statuses.length - 1], 201);
  });
});
