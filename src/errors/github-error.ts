export class GitHubApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message)

    this.name = this.constructor.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
