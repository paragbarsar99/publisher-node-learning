"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBook = exports.updateBook = exports.deletBookById = exports.createBook = exports.getBookById = exports.getBooks = void 0;
const index_1 = __importDefault(require("../db/index"));
const books_model_1 = require("../models/books.model");
const drizzle_orm_1 = require("drizzle-orm");
const messages_1 = require("../utils/messages");
const authors_model_1 = require("../models/authors.model");
const getBooks = async (req, res) => {
    const book = await index_1.default.select().from(books_model_1.bookModel);
    res.status(200).json({
        message: "Books are fetched",
        data: book,
    });
};
exports.getBooks = getBooks;
const getBookById = async (req, res) => {
    const bookId = req.params.id;
    const [book] = await index_1.default.select()
        .from(books_model_1.bookModel)
        .where((0, drizzle_orm_1.eq)(books_model_1.bookModel.id, bookId))
        .leftJoin(authors_model_1.authorModel, (0, drizzle_orm_1.eq)(books_model_1.bookModel.authorId, authors_model_1.authorModel.id))
        .limit(1);
    if (!book) {
        throw new Error("Not books found please enter valid book id");
    }
    return res.status(200).json({
        message: messages_1.SUCCESS.DEFAULT,
        data: book,
        error: "",
    });
};
exports.getBookById = getBookById;
const createBook = async (req, res) => {
    const reqBooks = req.body;
    if (!reqBooks) {
        throw new Error("InValid Request Body!");
    }
    console.log(req.body);
    const [newBooks] = await index_1.default.insert(books_model_1.bookModel)
        .values({
        name: reqBooks.name,
        discription: reqBooks?.discription,
        price: reqBooks.price,
        authorId: reqBooks.authorId,
    })
        .returning({
        id: books_model_1.bookModel.id,
    });
    res.status(200).json({
        message: "Books is created",
        data: newBooks.id,
    });
};
exports.createBook = createBook;
const deletBookById = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        throw new Error("InValid Request Body!");
    }
    const book = await index_1.default.delete(books_model_1.bookModel)
        .where((0, drizzle_orm_1.eq)(books_model_1.bookModel.id, id))
        .returning();
    if (book.length === 0) {
        throw new Error("Book does't exist");
    }
    return res.status(200).json({
        message: "Books is delete",
        data: [],
    });
};
exports.deletBookById = deletBookById;
const updateBook = async (req, res) => {
    const reqId = req.body?.id;
    if (!reqId) {
        throw new Error(messages_1.ERRORS.INVALID_BODY);
    }
    const isBookExist = await index_1.default.select()
        .from(books_model_1.bookModel)
        .where((0, drizzle_orm_1.eq)(books_model_1.bookModel.id, reqId));
    if (isBookExist.length === 0) {
        throw new Error(messages_1.ERRORS.NOT_DATE_FOUND);
    }
    const [response] = await index_1.default.update(books_model_1.bookModel)
        .set({
        discription: req.body.discription,
        name: req.body.name,
        price: req.body.price,
    })
        .where((0, drizzle_orm_1.eq)(books_model_1.bookModel.id, reqId))
        .returning();
    return res.status(200).json({
        message: messages_1.SUCCESS.DEFAULT,
        data: response,
    });
};
exports.updateBook = updateBook;
const searchBook = async (req, res) => {
    const { search } = req.query;
    let result;
    const baseQuery = index_1.default.select().from(books_model_1.bookModel);
    if (search) {
        result = await baseQuery.where((0, drizzle_orm_1.sql) `${books_model_1.bookModel.nameSearch} @@ to_tsquery('english',${search})`);
    }
    else {
        result = await baseQuery;
    }
    res.status(200).json({
        message: messages_1.SUCCESS.DEFAULT,
        data: result,
    });
};
exports.searchBook = searchBook;
//# sourceMappingURL=books.controller.js.map