import { drizzle } from "drizzle-orm/postgres-js";

import { DATABASE_URL } from "@/consts";

export const db = drizzle(DATABASE_URL);
