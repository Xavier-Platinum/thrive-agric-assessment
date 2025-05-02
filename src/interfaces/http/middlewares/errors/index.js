const AppError = require("#root/src/shared/constants/errors/AppError.js");
const { formatResponse } = require("#root/src/shared/utils/http/response.js");

exports.errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: 500,
        message: 'Something went wrong',
        data: null
    };

    // If custom AppError
    if (err instanceof AppError) {
        customError.statusCode = err.statusCode;
        customError.message = err.message;
        customError.data = err.data;
    }

    // Mongoose validation errors
    else if (err.name === 'ValidationError') {
        customError.statusCode = 400;
        customError.message = Object.values(err.errors).map(e => e.message).join(', ');
    }

    // MongoDB duplicate key error
    else if (err.code && err.code === 11000) {
        customError.statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        customError.message = `Duplicate value for field: ${field}`;
    }

    // Cast errors for invalid ObjectId
    else if (err.name === 'CastError') {
        customError.statusCode = 400;
        customError.message = `Invalid ${err.path}: ${err.value}`;
    }

    // REVIEW: Log only internal errors
    if (customError.statusCode === 500) {
        console.error(`[UNHANDLED ERROR]:`, err);
    }

    const response = formatResponse({
        success: false,
        statusCode: customError.statusCode,
        data: customError.data,
        error: customError.message,
    });

    res.status(customError.statusCode).json(response);
};
