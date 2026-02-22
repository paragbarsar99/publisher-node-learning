"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const books_route_1 = __importDefault(require("./routes/books.route"));
const author_route_1 = __importDefault(require("./routes/author.route"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const responseHandler_1 = __importDefault(require("./middlewares/responseHandler"));
exports.app = (0, express_1.default)();
exports.app.use([express_1.default.json(), express_1.default.urlencoded({ extended: true }), logger_1.default]);
exports.app.get("/", (_, res) => {
    res.sendStatus(200).send("welcome to port:3000");
});
exports.app.use("/books", books_route_1.default);
exports.app.use("/author", author_route_1.default);
exports.app.use(responseHandler_1.default);
exports.app.listen(3000, () => {
    console.log("listining on port 3000");
});
//# sourceMappingURL=index.js.map