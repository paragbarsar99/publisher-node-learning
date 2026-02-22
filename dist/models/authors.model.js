"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorModel = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.authorModel = (0, pg_core_1.pgTable)("author", {
    id: (0, pg_core_1.uuid)().primaryKey().defaultRandom(),
    firstName: (0, pg_core_1.varchar)({ length: 50 }).notNull(),
    lastName: (0, pg_core_1.varchar)({ length: 50 }),
    emailId: (0, pg_core_1.varchar)({ length: 255 }).notNull().unique(),
    phoneNumber: (0, pg_core_1.integer)(),
    password: (0, pg_core_1.text)().notNull(),
    session: (0, pg_core_1.integer)()
});
//# sourceMappingURL=authors.model.js.map