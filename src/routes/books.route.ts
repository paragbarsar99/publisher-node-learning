import express from "express";
import {
  createBook,
  deletBookById,
  getBookById,
  getBooks,
  searchBook,
  updateBook,
} from "@controllers/books.controller";
import sessionChecker from "@middlewares/books/sessionChecker";

const booksRouter = express.Router();

booksRouter.use(sessionChecker);

booksRouter.get("/getBooks", getBooks);

booksRouter.get("/getBookById/:id", getBookById);

booksRouter.post("/saveMyBook", createBook);

booksRouter.delete("/bookById/:id", deletBookById);

booksRouter.patch("/bookById", updateBook);

booksRouter.get("/searchBook", searchBook);

export default booksRouter;
