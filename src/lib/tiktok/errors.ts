export class TikTokApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = "TikTokApiError";
    this.code = code;
    this.status = status;
  }
}

export function isInvalidGrant(error: unknown): boolean {
  return error instanceof TikTokApiError && error.code === "invalid_grant";
}
