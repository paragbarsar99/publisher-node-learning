"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookModel = exports.tsvector = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const authors_model_1 = require("./authors.model");
const drizzle_orm_1 = require("drizzle-orm");
exports.tsvector = (0, pg_core_1.customType)({
    dataType() {
        return `tsvector`;
    },
});
exports.bookModel = (0, pg_core_1.pgTable)("book", {
    id: (0, pg_core_1.uuid)().primaryKey().defaultRandom(),
    name: (0, pg_core_1.text)("name").notNull(),
    nameSearch: (0, exports.tsvector)("name_search")
        .notNull()
        .generatedAlwaysAs(() => (0, drizzle_orm_1.sql) `to_tsvector('english',${exports.bookModel.name})`),
    discription: (0, pg_core_1.text)("discription"),
    price: (0, pg_core_1.numeric)(),
    authorId: (0, pg_core_1.uuid)()
        .references(() => authors_model_1.authorModel.id)
        .notNull(), //forgien relation
}, (table) => [(0, pg_core_1.index)("idx_name_search").using("gin", table.nameSearch)]);
//# sourceMappingURL=books.model.js.map