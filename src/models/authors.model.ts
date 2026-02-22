import { integer, varchar, pgTable, uuid, text } from "drizzle-orm/pg-core";
export interface TAuthor {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  phoneNumber: number;
  password: string;
}

export interface TTokenInfo extends Omit<TAuthor, "password"> {}
export type RequestWithUser = { user: TTokenInfo };

export interface TLoginRequest extends Pick<TAuthor, "email" | "password"> {}
export const authorModel = pgTable("author", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar({ length: 50 }).notNull(),
  lastName: varchar({ length: 50 }),
  emailId: varchar({ length: 255 }).notNull().unique(),
  phoneNumber: integer(),
  password: text().notNull(),
});
