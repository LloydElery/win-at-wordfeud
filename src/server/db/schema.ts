// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { boolean } from "drizzle-orm/mysql-core";
import {
  index,
  text,
  pgTableCreator,
  serial,
  integer,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `win-at-wordfeud_${name}`);

export const words = createTable(
  "words",
  {
    id: serial("id").primaryKey(),
    word: text("word").notNull(),
    normalized_word: text("normalized_word").notNull(),
    word_value: integer("word_value").notNull().default(0),
    reports: integer("reports").notNull().default(0),
  },
  (example) => ({
    normalized_word_index: index("normalized_word_index").on(
      example.normalized_word,
    ),
  }),
);

export const userReports = createTable(
  "user_reports",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(), // Clerk user_id
    wordId: integer("word_id")
      .notNull()
      .references(() => words.id),
    reportedAt: timestamp("reported_at").defaultNow().notNull(),
  },
  (userReports) => ({
    uniqueUserReport: primaryKey(userReports.userId, userReports.wordId),
  }),
);
