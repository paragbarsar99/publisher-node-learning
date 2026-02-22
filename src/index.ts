import express from "express";
import booksRouter from "./routes/books.route";
import authorRouter from "@routes/author.route";
import Logger from "@middlewares/logger";
import RouteErrorHandler from "@middlewares/RouteErrorHandler";

export const app = express();
app.use([express.json(), express.urlencoded({ extended: true }), Logger]);

app.get("/", (_, res) => {
  res.sendStatus(200).send("welcome to port:3000");
});
app.use("/books", booksRouter);
app.use("/author", authorRouter);

app.use(RouteErrorHandler);

app.listen(3000, () => {
  console.log("listining on port 3000");
});
