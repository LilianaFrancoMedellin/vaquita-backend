import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

// one way of doing it
// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// });

// recommended way to it
const pool = new Pool();

export default pool;
