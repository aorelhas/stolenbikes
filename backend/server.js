import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import passport from 'passport';
import connectDB from './config/db.js';
import session from 'express-session';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes.js';
import bikeRoutes from './routes/bikeRoutes.js';

// require('./config/passport')(passport);

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

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
app.use('/api/users', userRoutes);
app.use('/api/bikes', bikeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
