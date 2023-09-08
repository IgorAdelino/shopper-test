import mysql from 'mysql';
import { env } from '../env';

export const db = mysql.createConnection({
  host: env.HOST,
  port: env.DATABASE_PORT,
  user: env.USER,
  password: env.PASSWORD,
  database: env.DATABASE_NAME
})
