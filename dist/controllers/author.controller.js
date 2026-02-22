"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBooks = exports.loginAuthor = exports.registerAuthor = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const index_1 = __importDefault(require("../db/index"));
const authors_model_1 = require("../models/authors.model");
const books_model_1 = require("../models/books.model");
const bcrypt_1 = require("bcrypt");
const dayjs_1 = __importDefault(require("dayjs"));
const registerAuthor = async (req, res) => {
    const body = req.body;
    if (!body) {
        throw new Error("please provide valid input");
    }
    //check if user exist with creads
    const [existingUser] = await index_1.default
        .select({
        email: authors_model_1.authorModel.emailId,
    })
        .from(authors_model_1.authorModel)
        .where((0, drizzle_orm_1.eq)(authors_model_1.authorModel.emailId, body.email));
    console.log(existingUser);
    if (existingUser?.email) {
        throw new Error("User already exist please login");
    }
    const password = await (0, bcrypt_1.hash)(body.password, 10);
    console.log("register", password);
    const user = await index_1.default
        .insert(authors_model_1.authorModel)
        .values({
        emailId: body.email,
        lastName: body.lastName,
        firstName: body.firstName,
        phoneNumber: body.phoneNumber,
        password,
    })
        .returning();
    res.status(201).json({
        message: "user has been created",
        data: user,
        error: {},
    });
};
exports.registerAuthor = registerAuthor;
const loginAuthor = async (req, res) => {
    const body = req.body;
    if (!body) {
        throw new Error("please provide valid input");
    }
    //check if user exist with creads
    const [existingUser] = await index_1.default
        .select({
        email: authors_model_1.authorModel.emailId,
        password: authors_model_1.authorModel.password,
        id: authors_model_1.authorModel.id,
    })
        .from(authors_model_1.authorModel)
        .where((0, drizzle_orm_1.eq)(authors_model_1.authorModel.emailId, body.email));
    if (!existingUser) {
        throw new Error("User does't existing with given email");
    }
    const isValidPassword = await (0, bcrypt_1.compare)(body.password, existingUser.password);
    if (!isValidPassword) {
        throw new Error("Please enter valid password");
    }
    //create a user sessoin of 10 mins
    const session = (0, dayjs_1.default)().add(10, "minutes").unix();
    const [updateUser] = await index_1.default
        .update(authors_model_1.authorModel)
        .set({
        session: session,
    })
        .where((0, drizzle_orm_1.eq)(authors_model_1.authorModel.id, existingUser.id))
        .returning();
    res.status(201).json({
        message: "user has been created",
        data: updateUser,
        error: {},
    });
};
exports.loginAuthor = loginAuthor;
const getAllBooks = async (req, res) => {
    const authorId = req.params.id;
    if (!authorId) {
        throw new Error("Please provide valid input");
    }
    const books = await index_1.default
        .select()
        .from(books_model_1.bookModel)
        .where((0, drizzle_orm_1.eq)(books_model_1.bookModel.authorId, authorId));
    res.status(200).json({
        message: "books found",
        data: books,
    });
};
exports.getAllBooks = getAllBooks;
//# sourceMappingURL=author.controller.js.map