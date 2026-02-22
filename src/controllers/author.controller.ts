import { eq } from "drizzle-orm";
import db from "@db/index";
import { authorModel, TAuthor, TLoginRequest } from "@models/authors.model";
import { bookModel } from "@models/books.model";
import { Request, Response } from "express";
import { compare, hash } from "bcrypt";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

export const registerAuthor = async (
  req: Request<undefined, undefined, TAuthor>,
  res: Response,
) => {
  const body = req.body;
  if (!body) {
    throw new Error("please provide valid input");
  }
  //check if user exist with creads
  const [existingUser] = await db
    .select({
      email: authorModel.emailId,
    })
    .from(authorModel)
    .where(eq(authorModel.emailId, body.email));
  console.log(existingUser);
  if (existingUser?.email) {
    throw new Error("User already exist please login");
  }

  const password = await hash(body.password, 10);

  console.log("register", password);
  const [user] = await db
    .insert(authorModel)
    .values({
      emailId: body.email,
      lastName: body.lastName,
      firstName: body.firstName,
      phoneNumber: body.phoneNumber,
      password,
    })
    .returning({
      emailId: authorModel.emailId,
      lastName: authorModel.lastName,
      firstName: authorModel.firstName,
      phoneNumber: authorModel.phoneNumber,
    });

  res.status(201).json({
    message: "user has been created",
    data: user,
    error: {},
  });
};

export const loginAuthor = async (
  req: Request<undefined, undefined, TLoginRequest>,
  res: Response,
) => {
  const body = req.body;
  if (!body) {
    throw new Error("please provide valid input");
  }
  //check if user exist with creads
  const [existingUser] = await db
    .select()
    .from(authorModel)
    .where(eq(authorModel.emailId, body.email));

  if (!existingUser) {
    throw new Error("User does't existing with given email");
  }

  const isValidPassword = await compare(body.password, existingUser.password);

  if (!isValidPassword) {
    throw new Error("Please enter valid password");
  }
  const expires = dayjs().add(10, "minutes").unix();
  const token = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.emailId,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      exp: expires,
    },
    process.env.JWT_SECRET!,
  );

;

  res.status(201).json({
    message: "user has been created",
    data: {
      token,
    },
    error: {},
  });
};

export const getAllBooks = async (req: Request, res: Response) => {
  const authorId = req.params.id as string;
  if (!authorId) {
    throw new Error("Please provide valid input");
  }

  const books = await db
    .select()
    .from(bookModel)
    .where(eq(bookModel.authorId, authorId));

  res.status(200).json({
    message: "books found",
    data: books,
  });
};

/**
 * session based login  
 * // const [updateUser] = await db
  //   .insert(sessionModel)
  //   .values({
  //     userId: existingUser.id,
  //   })
  //   .returning({
  //     sessionId: sessionModel.id,
  //     userId: sessionModel.userId,
  //   })
 */