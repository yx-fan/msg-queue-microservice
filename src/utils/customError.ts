class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500, stack: string = '') {
    super(message);
    this.statusCode = statusCode;
    this.name = this.getErrorName(statusCode);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  private getErrorName(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return 'ValidationError';
      case 401:
        return 'AuthenticationError';
      case 403:
        return 'AuthorizationError';
      case 404:
        return 'NotFoundError';
      case 500:
        return 'InternalServerError';
      default:
        return 'InternalServerError';
    }
  }
}
  
export default CustomError;