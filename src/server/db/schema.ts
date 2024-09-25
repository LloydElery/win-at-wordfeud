// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
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
    word_index: index("word_index").on(example.word),
    word_length_index: index("word_length_index").on(
      sql`LENGTH(${example.word})`,
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

export const communityWords = createTable(
  "community_words",
  {
    id: serial("id").primaryKey(),
    word: text("word").notNull().unique(),
    normalized_word: text("normalized_word").notNull(),
    word_value: integer("word_value").notNull().default(0),
    reports: integer("reports").notNull().default(0),
    up_votes: integer("up_votes").notNull().default(0),
    down_votes: integer("down_votes").notNull().default(0),
    score: integer("score").generatedAlwaysAs(sql`up_votes - down_votes`),
    status: varchar("status", { length: 50 }).notNull().default("pending"),
    created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (example) => ({
    uniqueWordCombination: sql`CONSTRAINT unique_word_combination UNIQUE (${example.word}, ${example.normalized_word})`,
  }),
);
