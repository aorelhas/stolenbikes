const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');

require('./config/passport')(passport);

// IMPORT ROUTES

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Express Session
app.use(
  session({
    secret: process.env.SESSION_SECURE,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());

// APP USE ROUTES
app.use('/auth', require('./routes/userRoutes'))

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
