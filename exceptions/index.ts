export class AppException extends Error {
  public readonly statusCode: number;
  public readonly error: string;

  constructor(messageLabel: string, statusCode: number, errorLabel: string) {
    super(messageLabel);
    this.statusCode = statusCode;
    this.error = errorLabel;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InternalServerException extends AppException {
  constructor(message: string = "Something went wrong in the server") {
    super(message, 500, "INTERNAL_SERVER_ERROR");
  }
}

export class BadRequestException extends AppException {
  constructor(message: string) {
    super(message, 400, "BAD_REQUEST");
  }
}

export class UnauthorizedException extends AppException {
  constructor(message: string = "Authentication required") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenException extends AppException {
  constructor(
    message: string = "You do not have permission to perform this action"
  ) {
    super(message, 403, "ACCESS_DENIED");
  }
}

export class NotFoundException extends AppException {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND");
  }
}

export class ConflictException extends AppException {
  constructor(message: string) {
    super(message, 409, "CONFLICT_DETECTED");
  }
}

export class UnprocessableEntityException extends AppException {
  constructor(message: string) {
    super(message, 422, "REQUEST_UNPROCESSABLE");
  }
}

export class RateLimitException extends AppException {
  constructor(message: string = "Too many requests, please try again later") {
    super(message, 429, "RATE_LIMIT_EXCEEDED");
  }
}
