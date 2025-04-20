// db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the database connection
export const initDB = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  // Create the users table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      firstname TEXT NOT NULL,
      lastname TEXT NOT NULL
    );
  `);

  return db;
};
