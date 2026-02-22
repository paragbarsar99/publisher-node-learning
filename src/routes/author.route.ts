import express from 'express'
import { getAllBooks, loginAuthor, registerAuthor } from '@controllers/author.controller';

const authorRouter = express.Router();

authorRouter.post("/register",registerAuthor)
authorRouter.post("/login",loginAuthor)

authorRouter.get("/getAllBooks/:id",getAllBooks)

export default authorRouter