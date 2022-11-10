class DatabaseError extends Error {
  constructor(error?: Error) {
    super();
    this.name = "DatabaseError";
    this.message = error?.message ? error.message : "Database error occurred.";
    this.stack = error?.stack;
    this.cause = error?.cause;
  }
}

class RequestError extends Error {
  constructor(error?: Error) {
    super();
    this.name = "RequestError";
    this.message = error?.message ? error.message : "Request error occurred.";
    this.stack = error?.stack;
    this.cause = error?.cause;
  }
}

class ApiError extends Error {
  constructor(error?: Error) {
    super();
    this.name = "ApiError";
    this.message = error?.message ? error.message : "API error occurred.";
    this.stack = error?.stack;
    this.cause = error?.cause;
  }
}

export { DatabaseError, RequestError, ApiError };
