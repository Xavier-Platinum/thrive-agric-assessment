const mongoose = require('mongoose');
const config = require('#root/src/infrastructure/config/env.js');

let retryCount = 0;
const MAX_RETRIES = 5;
const RETRY_INTERVAL_MS = 3000;

const mongoOptions = {
    autoIndex: !config.isProd,
    maxPoolSize: config.dbMaxPoolSize,
    minPoolSize: config.dbMinPoolSize,
    serverSelectionTimeoutMS: config.dbServerSelectionTimeoutMS,
    socketTimeoutMS: config.dbSocketTimeoutMS,
    family: config.dbFamily,
};

if (config.mongoUser && config.mongoPass) {
    mongoOptions.auth = {
        username: config.mongoUser,
        password: config.mongoPass,
    };
}

const connectWithRetry = async () => {
    try {
        await mongoose.connect(config.mongoUri, mongoOptions);
        // console.log(`MongoDB connected [${config.mongoUri}]`);
    } catch (error) {
        retryCount++;
        console.error(`MongoDB connection failed (attempt ${retryCount}): ${error.message}`);
        if (retryCount < config.dbMaxRetry) {
            console.log(`Retrying in ${config.dbRetryInterval / 1000}s...`);
            setTimeout(connectWithRetry, config.dbRetryInterval);
        } else {
            console.error('Max retries reached. Exiting process.');
            process.exit(1);
        }
    }
};

// Handle graceful shutdown
const gracefulExit = () => {
    mongoose.connection.close(() => {
        // console.log('MongoDB connection closed through app termination');
        process.exit(0);
    });
};

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

module.exports = {
    connectDB: connectWithRetry,
};

