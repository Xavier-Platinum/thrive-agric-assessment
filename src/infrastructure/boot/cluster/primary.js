const cluster = require('cluster');
const os = require('os');
const numberOfCPUCores = os.cpus().length;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let numberOfWorkers = 0

if (cluster.isPrimary) {
    if (process.env._CLUSTER_FORK.toLowerCase() === 'auto') {
        numberOfWorkers = numberOfCPUCores
    } else {
        numberOfWorkers = parseInt(process.env._CLUSTER_FORK)    
    }

    if (isNaN(numberOfWorkers) || numberOfWorkers < 0) numberOfWorkers = numberOfCPUCores;
    const forkingInterval = parseInt(process.env._CLUSTER_FORK_DELAY) ?? 1200;
    const workerRestartingInterval = parseInt(process.env._CLUSTER_WORKER_RESTARTING_DELAY) ?? 2000;
    const restartDiedWorkers = (process.env._CLUSTER_WORKER_RESTART === "yes") || !process.env._CLUSTER_WORKER_RESTART;

    cluster.on('exit', async (worker, code, signal) => {
        if (!restartDiedWorkers) return;

        console.log("CLUSTER WORKER", ` ${worker.process.pid} died. Restarting in...`, workerRestartingInterval / 1000, 'second(s)');
        sleep(workerRestartingInterval);
        cluster.fork();
    });

    // Log online workers
    // cluster.on('online', (worker) => {
    //     console.log(`Worker ${worker.process.pid} is online`);
    // });

    // Handle uncaught exceptions in primary
    process.on('uncaughtException', (err) => {
        console.error('[PRIMARY] Uncaught Exception:', err);
    });

    process.on('unhandledRejection', (reason) => {
        console.error('[PRIMARY] Unhandled Rejection:', reason);
    });

    console.log("cluster", "creating", numberOfWorkers, "worker(s) in", (forkingInterval / 1000) * (numberOfWorkers - 1), "second(s)")
    console.log("cluster", "Restart Killed Workers:", restartDiedWorkers)
    for (let i = 0; i < numberOfWorkers; i++) {
        cluster.fork();
        console.log("workers:", i, "/", numberOfWorkers);
        if (i !== numberOfWorkers) {
            sleep(forkingInterval);
        }
    }
}