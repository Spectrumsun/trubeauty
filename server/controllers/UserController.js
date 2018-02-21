import mongoose from 'mongoose';
import crypto from 'crypto';
import User  from '../models/User';
import mail from '../handlers/mail';


require('dotenv').config({ path: '.env' });
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

  static async forgotPassword (req, res ) {
    const user = await User.findOne({email: req.body.email });
    if(!user){
      req.flash('success', 'A password reset has been mailed to you');
      return res.redirect('/login')
    }

    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 360000;
    await user.save();

    const resetURL = `http//${req.headers.host}/account/reset/${user.resetPasswordToken}`;
    await mail.send({
      user,
      subject: 'Password Reset',
      resetURL
    })
    req.flash('success', `You have been emailed a passsword reset link`)
    res.redirect('/login');
  }

  static async reset (req, res ) {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if(!user) {
      req.flash('error', 'Password reset token is not invalid or has expired');
      return res.redirect('/login');
    }
    
    res.render('resetpassword', {title: 'Reset your Password'});
  }

  static async passwordupdate (req, res) {
     const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if(!user) {
      req.flash('error', 'Password reset token is not invalid or has expired');
      res.redirect('/login');
    }

      const newPassword = req.body.password
            user.setPassword(newPassword, () => {
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
            user.save()
            req.flash('success', '💃 Nice! Your password has been reset! You are can now login!');
            res.redirect('/login');
   })

}


  static logout (req, res) {
    req.logout();
    req.flash('success', 'You are now logged out! 👋');
    res.redirect('/');
  }

}

export default Users;
