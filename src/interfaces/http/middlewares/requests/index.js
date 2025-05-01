
/*
 * @description Middleware to handle custom requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 * @returns {void}
 */
exports["requestsHandler"] = (req, res, next) => {
    // Middleware to handle custom requests
    // console.log(`[${req.method}] ${req.originalUrl}`);
    next();
};

/*
 * @description Middleware to handle validation errors
 * @param {Object} schema - Joi schema object
 * @param {string} check - The part of the request to validate (default: 'body')
 * @returns {Function} Middleware function
 */
exports['validationHandler'] = (schema, check = 'body') => {
    return (req, res, next) => {
        const validationResult = schema.validate(req[check]);
        if (validationResult.error) {
            return res.status(400).json({
                status: 'error',
                message: validationResult.error.details[0].message
            });
        }
        next();
    };
}
