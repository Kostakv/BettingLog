// filepath: /c:/Users/kosta/Desktop/Web Apps/BettingLog/server/testDotenv.js
require('dotenv').config();

console.log('Database connection details:', {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});