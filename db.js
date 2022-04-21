import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const pool = new Pool(Deno.env.get('PG_CONNECTION_STRING') || '', 10);

export default async (query, params) => {
  console.log(pool)
  const client = await pool.connect();
  try {
  return (await client.queryObject(query, params)).rows || [];
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};
