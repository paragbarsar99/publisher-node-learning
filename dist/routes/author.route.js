"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_controller_1 = require("../controllers/author.controller");
const authorRouter = express_1.default.Router();
authorRouter.post("/register", author_controller_1.registerAuthor);
authorRouter.post("/login", author_controller_1.loginAuthor);
authorRouter.get("/getAllBooks/:id", author_controller_1.getAllBooks);
exports.default = authorRouter;
//# sourceMappingURL=author.route.js.map