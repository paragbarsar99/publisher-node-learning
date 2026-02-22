import { integer, varchar, pgTable, uuid, text } from "drizzle-orm/pg-core";
import { authorModel } from "./authors.model";
import { timestamp } from "drizzle-orm/pg-core";

interface TSession {
  id: string;
  userId: string;
}

export const sessionModel = pgTable("session", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .references(() => authorModel.id)
    .notNull(),
  createdAt: timestamp().
  defaultNow().notNull(),
});
