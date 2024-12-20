// ----------------------- REQUIREMENTS
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieSession = require('cookie-session');

const { db } = require('./db');
const routes = require('./routes');
const bodyParser = require("body-parser");

// ----------------------- SETUP AND MIDDLEWARES
db.connect();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); // includes security headers (OWASP)
app.use(morgan('dev')); // middleware that logs all the requests
app.use(express.json()); // allow requests to include json body

// Manually handle CORS for local development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow only frontend origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(
  cookieSession({
    name: 'session',
    keys: ['myRandomSuperSecretKey', 'anotherRandomString'],
    maxAge: 10 * 60 * 1000, // 10 min
  })
);

// ----------------------- ROUTES / ENDPOINTS
app.use('/', routes);

module.exports = app;
