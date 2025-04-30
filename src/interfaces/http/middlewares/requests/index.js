exports["requestsHandler"] = (req, res, next) => {
    // Middleware to handle custom requests
    // console.log(`[${req.method}] ${req.originalUrl}`);
    next();
};
