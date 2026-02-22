"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../db/index"));
const authors_model_1 = require("../../models/authors.model");
const dayjs_1 = __importDefault(require("dayjs"));
const drizzle_orm_1 = require("drizzle-orm");
const sessionChecker = async (req, res, next) => {
    //check if session expired
    const author = req.body;
    if (!author) {
        throw new Error("Invalid Body request!");
    }
    const [user] = await index_1.default
        .select({
        session: authors_model_1.authorModel.session,
    })
        .from(authors_model_1.authorModel)
        .where((0, drizzle_orm_1.eq)(authors_model_1.authorModel.id, author.authorId));
    if (!user.session) {
        throw new Error("Session is Expired please login again!");
    }
    const extension = dayjs_1.default.unix(user.session).add(10, "minutes");
    const isExpired = (0, dayjs_1.default)().isAfter(extension);
    if (isExpired) {
        await index_1.default.update(authors_model_1.authorModel).set({
            session: null,
        });
        throw new Error("Please logni again session is expired");
    }
    next();
};
exports.default = sessionChecker;
//# sourceMappingURL=sessionChecker.js.map