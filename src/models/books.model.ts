import {
  numeric,
  pgTable,
  uuid,
  index,
  customType,
  text,
} from "drizzle-orm/pg-core";
import { authorModel } from "@models/authors.model";
import { SQL, sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export interface TBookRequest {
  id:string,
  name: string;
  discription?: string;
  price?: string;
}

export const tsvector = customType<{
  data: string;
}>({
  dataType() {
    return `tsvector`;
  },
});
export const bookModel = pgTable(
  "book",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: text("name").notNull(),
    nameSearch: tsvector("name_search")
      .notNull()
      .generatedAlwaysAs(
        (): SQL => sql`to_tsvector('english',${bookModel.name})`,
      ),
    discription: text("discription"),
    price: numeric(),
    authorId: uuid()
      .references(() => authorModel.id)
      .notNull(), //forgien relation
      createdAt:timestamp().defaultNow()
  },
  (table) => [index("idx_name_search").using("gin", table.nameSearch)],
);
