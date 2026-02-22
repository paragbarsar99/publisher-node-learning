import Db from "@db/index";
import { bookModel, TBookRequest } from "@models/books.model";
import { and, desc, eq, sql } from "drizzle-orm";
import { ERRORS, SUCCESS } from "@utils/messages";
import { Request, Response } from "express";
import { authorModel, RequestWithUser } from "@models/authors.model";
import { BadRequest } from "@utils/ErrorHandler";

type requestById = {
  id: string;
};
type TPagination = {
  limit: number;
  offset: number;
};
export const getBooks = async (
  req: Request<undefined, undefined, RequestWithUser, TPagination>,
  res: Response,
) => {
  const { offset = 1, limit = 10 } = req.query;
  const { id } = req.body.user;
  console.log(offset, limit);
  const book = await Db.select()
    .from(bookModel)
    .where(eq(bookModel.authorId, id))
    .orderBy(desc(bookModel.createdAt), desc(bookModel.id))
    .limit(Number(limit))
    .offset(Number(offset - 1) * Number(limit));

  res.status(200).json({
    message: "Books are fetched",
    data: book,
    pagination: {
      offset,
      limit,
    },
  });
};

export const getBookById = async (
  req: Request<requestById, undefined, RequestWithUser>,
  res: Response,
) => {
  const bookId = req.params.id;

  const [book] = await Db.select()
    .from(bookModel)
    .where(eq(bookModel.id, bookId))
    .leftJoin(authorModel, eq(bookModel.authorId, authorModel.id));

  if (!book) {
    throw new Error("Not books found please enter valid book id");
  }

  return res.status(200).json({
    message: SUCCESS.DEFAULT,
    data: book,
    error: "",
  });
};

export const createBook = async (
  req: Request<requestById, undefined, RequestWithUser & TBookRequest>,
  res: Response,
) => {
  const { user, ...book } = req.body;
  if (!book?.name) {
    throw new BadRequest(ERRORS.INVALID_BODY);
  }
  const [newBooks] = await Db.insert(bookModel)
    .values({
      name: book.name,
      discription: book.discription,
      price: book.price,
      authorId: user.id,
    })
    .returning({
      id: bookModel.id,
    });
  res.status(200).json({
    message: "Books is created",
    data: newBooks.id,
  });
};

export const deletBookById = async (
  req: Request<requestById, undefined, RequestWithUser>,
  res: Response,
) => {
  const user = req.body.user;
  const id = req.params.id;
  if (!id) {
    throw new Error("InValid Request Body!");
  }

  const book = await Db.delete(bookModel)
    .where(and(eq(bookModel.id, id), eq(bookModel.authorId, user.id)))
    .returning();
  if (book.length === 0) {
    throw new Error("Book does't exist");
  }
  return res.status(200).json({
    message: "Books is delete",
    data: [],
  });
};

export const updateBook = async (
  req: Request<undefined, undefined, RequestWithUser & TBookRequest>,
  res: Response,
) => {
  const { user, discription, name, price, id } = req.body;

  if (!id) {
    throw new BadRequest(ERRORS.INVALID_BODY);
  }

  const [response] = await Db.update(bookModel)
    .set({
      discription: discription,
      name: name,
      price: price,
    })
    .where(and(eq(bookModel.id, id), eq(bookModel.authorId, user.id)))
    .returning({
      discription: bookModel.discription,
      name: bookModel.name,
      price: bookModel.price,
      id: bookModel.id,
    });
  if (!response?.id) {
    throw new BadRequest("Not Book Found");
  }
  return res.status(200).json({
    message: SUCCESS.DEFAULT,
    data: response,
  });
};

export const searchBook = async (
  req: Request<undefined, undefined, RequestWithUser>,
  res: Response,
) => {
  const user = req.body.user;
  const { search } = req.query;
  let result;
  const baseQuery = Db.select({
    id: bookModel.id,
    name: bookModel.name,
    discription: bookModel.discription,
    price: bookModel.price,
    authorId: bookModel.authorId,
  }).from(bookModel);
  if (search) {
    result = await baseQuery.where(
      sql`${bookModel.nameSearch} @@ to_tsquery('english',${search})`,
    );
  } else {
    result = await baseQuery;
  }
  res.status(200).json({
    message: SUCCESS.DEFAULT,
    data: result,
  });
};
