"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("../controllers/books.controller");
const sessionChecker_1 = __importDefault(require("../middlewares/books/sessionChecker"));
const booksRouter = express_1.default.Router();
booksRouter.use(sessionChecker_1.default);
booksRouter.get("/getBooks", books_controller_1.getBooks);
booksRouter.get("/getBookById/:id", books_controller_1.getBookById);
booksRouter.post("/saveMyBook", books_controller_1.createBook);
booksRouter.delete("/bookById/:id", books_controller_1.deletBookById);
booksRouter.patch("/bookById", books_controller_1.updateBook);
booksRouter.get("/searchBook", books_controller_1.searchBook);
exports.default = booksRouter;
//# sourceMappingURL=books.route.js.map