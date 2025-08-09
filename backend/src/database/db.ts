import dotenv from "dotenv";
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

export const sql = neon(process.env.DATABASE_URL);
