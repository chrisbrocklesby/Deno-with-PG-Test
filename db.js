import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const pool = new Pool({
  user: Deno.env.get("PGUSER") || '',
  password: Deno.env.get("PGPASSWORD") || '',
  database: Deno.env.get("PGDATABASE") || '',
  hostname: Deno.env.get("PGHOST") || '',
  port: Deno.env.get("PGPORT") || '5432',
}, 2);

export default async (query, params) => {
  const client = await pool.connect();
  try {
  return (await client.queryObject(query, params)).rows || [];
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};
