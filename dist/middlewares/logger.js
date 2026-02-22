"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const REQUEST_LOG_PATH = `./request_log.txt`;
console.log(REQUEST_LOG_PATH, " REQUEST_LOG_PATH");
const Logger = (req, res, next) => {
    const logs = {
        method: req.method,
        url: req.url,
        header: req.headers,
        timeStamp: new Date().toISOString(),
    };
    if (!node_fs_1.default.existsSync(REQUEST_LOG_PATH)) {
        node_fs_1.default.writeFile(REQUEST_LOG_PATH, "", (err) => {
            if (err) {
                console.error("Error creating log file:", err);
            }
        });
    }
    node_fs_1.default.appendFile(REQUEST_LOG_PATH, `${JSON.stringify(logs)}\n`, (err) => {
        console.log(err, " error in logging");
    });
    next();
};
exports.default = Logger;
//# sourceMappingURL=logger.js.map