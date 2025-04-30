const cluster = require('cluster');

exports.clusterStart = async () => {
    console.log(process.env.NODE_ENV)
    if (cluster.isPrimary) {
        require('./primary.js');
    } else {
        console.log(`Worker ${process.pid} started`);
        require('./workers.js');
    }
}
