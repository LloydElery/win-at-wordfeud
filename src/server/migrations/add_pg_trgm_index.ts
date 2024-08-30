import { sql } from "drizzle-orm";
import { db } from "../db";

async function addPgTrgmIndex() {
  try {
    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);

    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS trgm_idx
      ON words USING GIST (normalized_word gist_trgm_ops);
    `);

    console.log("pg_trgm extension and index created successfully.");
  } catch (error) {
    console.error("Error creating pg_trgm index:", error);
  }
}

addPgTrgmIndex();
