"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler = (error, req, res, next) => {
    try {
        res.status(error.status || 500).json({
            message: error.message,
            data: [],
            error: {
                message: error.message || "something went wrong please try again!",
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
        });
    }
};
exports.default = responseHandler;
//# sourceMappingURL=responseHandler.js.map