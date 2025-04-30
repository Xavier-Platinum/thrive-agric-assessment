require('dotenv').config();

const ENV = process.env.NODE_ENV || 'development';
const IS_PROD = ENV === 'production';

module.exports = {
    env: ENV,
    isProd: IS_PROD,
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    redisUrl: process.env.REDIS_URL,
    redisPort: process.env.REDIS_PORT,
    redisPassword: process.env.REDIS_PASSWORD,
    dbUser: process.env.MONGO_USER,
    dbPass: process.env.MONGO_PASS,
    dbMaxRetry: process.env.DB_MAX_RETRY || 5,
    dbRetryInterval: process.env.DB_RETRY_INTERVAL || 3000,
    dbMaxPoolSize: process.env.DB_MAX_POOL_SIZE || 10,
    dbMinPoolSize: process.env.DB_MIN_POOL_SIZE || 2,
    dbServerSelectionTimeoutMS: process.env.DB_SERVER_SELECTION_TIMEOUT_MS || 10000,
    dbSocketTimeoutMS: process.env.DB_SOCKET_TIMEOUT_MS || 45000,
    dbFamily: process.env.DB_FAMILY || 4,
};