// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  text,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";

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
  },
  (example) => ({
    normalized_word_index: index("normalized_word_index").on(
      example.normalized_word,
    ),
  }),
);
