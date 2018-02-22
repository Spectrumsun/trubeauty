import passport from 'passport';

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login. Invalid Email or Password!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});
 

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); 
    return;
  }
  req.flash('error', 'Oops you must be logged in to do that!');
  req.session.returnTo = req.path;
  res.redirect('/login');
};