module.exports = class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true, data = null) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
    }
}
