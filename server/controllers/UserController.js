import mongoose from 'mongoose';
import User  from '../models/User';
import { promisify } from 'es6-promisify';
class Users {
  static signupForm (req, res) {
    res.render('signup', {title: 'Signup'});
  }
 
  static loginForm (req, res) {
    res.render('login', {title: 'Login'});
  }

  static signup (req, res, next) {
      const user = new User({
            email: req.body.email, 
            username: req.body.username,
            number: req.body.number,
            gender: req.body.gender,
            picture: req.body.picture,
      })
     User.register(user, req.body.password, (err, user) => {
       if(err){
         console.log(err )
         req.flash('Sign up error', err )
         res.render('signup', {title: 'Signup', body: req.body, err: err, flashes: req.flash() })
       }else{
          next();
       }
        
     })
  }

  static passwordreset (req, res ) {
    res.render('passwordreset');
  }

  static logout (req, res) {
    req.logout();
    req.flash('success', 'You are now logged out! 👋');
    res.redirect('/');
  }

}

export default Users;
