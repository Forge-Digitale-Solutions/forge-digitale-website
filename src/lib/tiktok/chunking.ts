export type ChunkRange = {
  start: number;
  end: number;
  length: number;
};

export type ChunkPlan = {
  videoSize: number;
  chunkSize: number;
  totalChunkCount: number;
  ranges: ChunkRange[];
};

const MIN_CHUNK = 5 * 1024 * 1024;
const MAX_CHUNK = 64 * 1024 * 1024;
const MAX_FINAL = 128 * 1024 * 1024;
const PREFERRED_CHUNK = 10_000_000;
const MAX_CHUNKS = 1000;
const MAX_VIDEO = 4 * 1024 * 1024 * 1024;

export function splitChunks(videoSize: number, chunkSize: number): ChunkRange[] {
  if (
    !Number.isInteger(videoSize) ||
    !Number.isInteger(chunkSize) ||
    videoSize <= 0 ||
    chunkSize <= 0
  ) {
    throw new Error("Découpage invalide");
  }
  const count = Math.floor(videoSize / chunkSize);
  if (count < 1 || count > MAX_CHUNKS) {
    throw new Error("Nombre de segments invalide");
  }
  const ranges: ChunkRange[] = [];
  for (let index = 0; index < count; index += 1) {
    const start = index * chunkSize;
    const end = index === count - 1 ? videoSize - 1 : start + chunkSize - 1;
    ranges.push({ start, end, length: end - start + 1 });
  }
  return ranges;
}

export function planFileUpload(videoSize: number): ChunkPlan {
  if (!Number.isInteger(videoSize) || videoSize <= 0 || videoSize > MAX_VIDEO) {
    throw new Error("Taille de vidéo invalide");
  }
  if (videoSize <= MAX_CHUNK) {
    return {
      videoSize,
      chunkSize: videoSize,
      totalChunkCount: 1,
      ranges: [{ start: 0, end: videoSize - 1, length: videoSize }],
    };
  }

  let chunkSize = PREFERRED_CHUNK;
  let count = Math.floor(videoSize / chunkSize);
  if (count > MAX_CHUNKS) {
    chunkSize = Math.ceil(videoSize / MAX_CHUNKS);
    if (chunkSize > MAX_CHUNK || chunkSize < MIN_CHUNK) {
      throw new Error("Découpage impossible");
    }
    count = Math.floor(videoSize / chunkSize);
  }
  if (count < 2 || count > MAX_CHUNKS || chunkSize < MIN_CHUNK || chunkSize > MAX_CHUNK) {
    throw new Error("Découpage impossible");
  }

  const ranges = splitChunks(videoSize, chunkSize);
  const last = ranges[ranges.length - 1];
  if (!last || last.length < MIN_CHUNK || last.length > MAX_FINAL) {
    throw new Error("Dernier segment hors limites");
  }
  for (let index = 0; index < ranges.length - 1; index += 1) {
    if (ranges[index].length !== chunkSize) {
      throw new Error("Segment hors limites");
    }
  }
  return {
    videoSize,
    chunkSize,
    totalChunkCount: ranges.length,
    ranges,
  };
}

export function contentRangeHeader(start: number, end: number, total: number): string {
  return `bytes ${start}-${end}/${total}`;
}
