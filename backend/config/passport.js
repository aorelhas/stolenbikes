const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('../models/userModel');

dotenv.config();

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = new User();

        newUser.email = profile.email[0].value;
        newUser.google = profile.id;

        // tokens

        newUser.profile.name = profile.displayName;
        newUser.profile.image = profile.photos[0].value;

        try {
          let userExist = await User.findOne({ google });

          if (userExist) {
            done(null, userExist);
          } else {
            userExist = await User.create(newUser);
            done(null, userExist);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
