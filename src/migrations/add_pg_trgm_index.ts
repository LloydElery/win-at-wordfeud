import { sql } from "drizzle-orm";
import { db } from "../server/db"; // Justera importvägen om det behövs

async function addPgTrgmIndex() {
  try {
    // Skapa pg_trgm-extension om den inte redan finns
    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);

    // Skapa ett trigram-index på kolumnen normalized_word
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS trgm_idx
      ON words USING GIST (normalized_word gist_trgm_ops);
    `);

    console.log("pg_trgm extension and index created successfully.");
  } catch (error) {
    console.error("Error creating pg_trgm index:", error);
  }
}

// Kör migrationen
addPgTrgmIndex();
