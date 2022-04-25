export class CustomError extends Error {
  constructor(statusCode, initiatorUrl, message) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    this.name = 'CustomError';
    this.statusCode = statusCode;
    this.initiatorUrl = initiatorUrl;
    this.date = new Date()
  }
}