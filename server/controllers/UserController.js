import mongoose from 'mongoose';
import User  from '../models/User';
import promisify from 'promisify';

class Users {
  static signupForm (req, res) {
    res.render('signup', {title: 'Signup'});
  }
 
  static loginForm (req, res) {
    res.render('login', {title: 'Login'});
  }

 static async signup (req, res, next) {
      const user = new User({
            email: req.body.email, 
            name: req.body.name,
            number: req.body.number,
            gender: req.body.gender,
            picture: req.body.picture,
      })

      const register = promisify( User.register, User);
      await register(user, req,body.password)
      next();
  }

  static login (req, res) {
  
  }

}

export default Users;
