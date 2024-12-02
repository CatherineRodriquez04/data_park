// lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root',      
    password: 'K@rl2024', // Change to your localhost password
    database: 'am_park',
});

async function testDatabase() {
    try {
      const [rows] = await pool.query('SELECT 1');
      console.log('Database connection successful:', rows);
    } catch (error) {
      console.error('Database connection error:', error.message);
    }
  }

  testDatabase();

  export async function query(sql, params) {
    const [rows] = await pool.execute(sql, params);
    return rows;
  }