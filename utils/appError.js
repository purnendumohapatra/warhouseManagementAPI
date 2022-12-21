class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "API error fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);//this will take the arguments as the object 
    //and a constructor and it will store the error in a stack.
  }
}

module.exports = AppError;
