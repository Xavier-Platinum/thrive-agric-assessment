const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;
const { connectDB } = require('#root/src/infrastructure/database/connection.js');
const app = require('#root/src/interfaces/app/index.js');
// const app = require('./src/interfaces/http/server');

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    connectDB();
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    app.listen(process.env.PORT || 3000, () =>
        console.log(`Server running on port ${process.env.PORT || 3000} - PID ${process.pid}`)
    );
}
