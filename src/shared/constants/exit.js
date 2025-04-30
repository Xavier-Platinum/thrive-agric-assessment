module.exports = {
    beforeExit(code) {
        //console.log("ProcessExitHandler, on beforeExit event with code: ", code);
    },
    exit(code) {
        //console.log("ProcessExitHandler, on exit event with code: ", code);
    },
    uncaughtException(err) {
        console.log("ProcessExitHandler, on uncaughtException event with error: ", err.message, '(process.pid):', process.pid, ", has uncaught exception");
        console.error('error', err);
        console.error('error-stack', err.stack);
        process.exit(1);
    },
    SIGINT(signal) {
        //console.log("ProcessExitHandler, on SIGINT event with signal: ", signal, '(process.pid):', process.pid, ", has been interrupted`");
        process.exit(0);
    },
    SIGTERM(signal) {
        //console.log("ProcessExitHandler, on SIGTERM event with signal: ", signal, '(process.pid):', process.pid, ", received a SIGTERM signal");
        process.exit(0);
    }
};
