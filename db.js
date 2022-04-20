import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const pool = new Pool({
  user: Deno.env.get("PGUSER") || '',
  password: Deno.env.get("PGPASSWORD") || '',
  database: Deno.env.get("PGDATABASE") || '',
  hostname: Deno.env.get("PGHOST") || '',
  port: Deno.env.get("PGPORT") || '5432',
}, 2);

export default async (query) => {
  const client = await pool.connect();
  try {
  const result = await client.queryObject(query)
  return result.rows;
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
};
