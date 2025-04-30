const mongoose = require('mongoose');

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
            useBigInt64: true,
            // user: {
            //     username: process.env.MONGO_USER,
            //     password: process.env.MONGO_PASSWORD
            // }
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Mongo connection failed:', error.message);
    }
};
