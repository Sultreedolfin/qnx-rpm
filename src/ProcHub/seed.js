import { initDB } from './db.js';
import bcrypt from 'bcrypt';

// Creates the database and adds admin account
const seed = async () => {
  const db = await initDB();
  const username = 'admin';
  const password = 'Admin123!';
  const firstname = 'admin';
  const lastname = 'admin';
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await db.run(
      'INSERT INTO users (username, password, firstname, lastname) VALUES (?, ?, ?, ?)',
      username,
      hashedPassword,
      firstname,
      lastname
    );
    console.log('User created');
  } catch (err) {
    console.error('Error creating user:', err.message);
  }
};

seed();
