const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User');



passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  
  passport.use('login', new LocalStrategy({
    // nota: el usernamefield y pass... tienen que tener el mismo nombre q el input del html
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const user = await User.findOne({UserName: username});
    if(!user) {
      return done(null, false);
    }
    if(!user.verificarPassword(password)) {
      return done(null, false);
    }
    return done(null, user);
  }));