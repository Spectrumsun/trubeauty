import passport from 'passport';

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login. Invalid Email or Password!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});
 

