const cluster = require('cluster');
const config = require('#root/src/infrastructure/config/env.js');
const { connectDB } = require('#root/src/infrastructure/database/connection.js');
const { setupJobProcessor } = require('#root/src/infrastructure/jobs/deplication.js');

try {
    // _sys.data.set('worker', {
    //     pid: process.pid,
    //     id: cluster.worker.id,
    //     type: 'worker',
    // });
    const server = require('../app/index').listen(config.port, (a, e) => {
        connectDB();
        setupJobProcessor();
        console.log(`🚀 Worker PID: ${cluster.worker.id} running on port ${config.port}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log(`💀 Worker ${process.pid} shutting down...`);
        server.close(() => {
            console.log(`✅ Worker ${process.pid} gracefully exited`);
            process.exit(0);
        });
    });
} catch (error) {
    console.error('[Worker Startup Error]', error);
    process.exit(1);
}
