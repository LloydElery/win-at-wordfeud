import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { words } from "./schema";
import * as schema from "./schema";

export const db = drizzle(sql, { schema });

export { words };
