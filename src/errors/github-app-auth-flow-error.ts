export class GitHubAppAuthFlowError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly description: string
  ) {
    super(message)

    this.name = this.constructor.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
