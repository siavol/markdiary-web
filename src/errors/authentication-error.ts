export class AuthenticationError extends Error {
  constructor(
    message: string,
    public readonly innerError?: Error
  ) {
    super(message)
  }
}
