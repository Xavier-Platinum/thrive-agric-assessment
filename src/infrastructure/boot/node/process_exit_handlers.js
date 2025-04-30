const fs = require("fs");
const path = require("path");

let onExitHandler = null;

try {
    const mainDir = path.dirname(process.argv[1]).replaceAll("\\", path.sep);
    const onExitPath = path.join(mainDir, "src/shared/constants/exit.js");

    // Check access
    fs.accessSync(onExitPath, fs.constants.R_OK | fs.constants.W_OK);

    // Require CommonJS module
    onExitHandler = require(onExitPath);
} catch (e) {
    console.error("Failed to load onExitHandler:", e.message);
}

if (onExitHandler) {
    if (typeof onExitHandler.beforeExit === "function") {
        process.on("beforeExit", (code) => onExitHandler.beforeExit(code));
    }

    if (typeof onExitHandler.exit === "function") {
        process.on("exit", (code) => onExitHandler.exit(code));
    }

    if (typeof onExitHandler.SIGTERM === "function") {
        process.on("SIGTERM", (signal) => onExitHandler.SIGTERM(signal));
    }

    if (typeof onExitHandler.SIGINT === "function") {
        process.on("SIGINT", (signal) => onExitHandler.SIGINT(signal));
    }

    if (typeof onExitHandler.uncaughtException === "function") {
        process.on("uncaughtException", (err) => onExitHandler.uncaughtException(err));
    }
}
