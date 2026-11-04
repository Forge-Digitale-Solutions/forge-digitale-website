import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const EXPECTED =
  "tiktok-developers-site-verification=XOjQAB8DdH2PW8a4sd18NeYMXMbbyvp2";

describe("tiktok site verification", () => {
  it("serves the exact signature bytes with no trailing newline", async () => {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const file = path.resolve(
      here,
      "../../../public/tiktokXOjQAB8DdH2PW8a4sd18NeYMXMbbyvp2.txt",
    );
    const bytes = await readFile(file);
    assert.equal(bytes.toString("utf8"), EXPECTED);
    assert.equal(bytes.length, EXPECTED.length);
    assert.equal(bytes.length, 68);
    assert.notEqual(bytes[bytes.length - 1], 0x0a);
  });
});
