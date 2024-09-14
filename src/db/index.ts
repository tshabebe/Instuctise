import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { env } from "@/env";

const sql = postgres(env.DATABASE_URL);
export const db = drizzle(sql, { schema: schema });