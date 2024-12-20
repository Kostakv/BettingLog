const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const cors = require('cors'); // Import CORS middleware

const { db } = require('./db');
const routes = require('./routes');
const bodyParser = require("body-parser");

// ----------------------- SETUP AND MIDDLEWARES
db.connect();
const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Allow requests from frontend
  credentials: true, // Allow cookies to be sent
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logs all requests
app.use(express.json()); // Allow JSON body

app.use(
  cookieSession({
    name: 'session',
    keys: ['myRandomSuperSecretKey', 'anotherRandomString'],
    maxAge: 10 * 60 * 1000, // 10 minutes
  })
);

// ----------------------- ROUTES / ENDPOINTS
app.use('/', routes);

module.exports = app;