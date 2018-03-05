import mongoose from 'mongoose';
import crypto from 'crypto';
import User  from '../models/User';
import mail from '../handlers/mail';
import mail2 from '../handlers/mail2';
import imageUpload from '../middleware/imageUpload';
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
        username: req.body.username,
        phone: req.body.phone,
        gender: req.body.gender,
        address: req.body.address,
        picture: req.photos.secure_url,
        pictureID: req.photos.public_id,
        role: 'user',
        emailVerfication: crypto.randomBytes(20).toString('hex'),
        emailVerficationExpires: Date.now() + 360000
   });

     User.register(user, req.body.password, (err, user) => {
       if(err){
         req.flash('Sign up error', err )
         res.render('signup', {title: 'Signup', body: req.body, err: err, flashes: req.flash() })
       }/* else{
         const emailURL = `http//${req.headers.host}/account/confirmemail/${user.emailVerfication}`
          mail2.send({
          user,
          subject: 'Email verification',
          emailURL
        }) */
          next();
       //}
     })
  }

  static emailVerfication(req, res){
    req.flash('success', 'Check your inbox to verfiy your mail');
    res.redirect('/')
  }

  static async confirmEmail (req, res ) {
    const user = await User.findOne({
      emailVerfication: req.params.token,
      emailVerficationExpires: { $gt: Date.now() }
    });

    if(!user) {
      req.flash('error', 'Email verification failed token is not invalid or has expired');
      return res.redirect('/user/signup');
    }
    user.emailVerfication = undefined
    user.emailVerficationExpires = undefined
    user.save()
    req.flash('success', '💃 Nice! Email Confirmed You are can now login!');
    res.redirect('/user/login');
  }

  static async isConfirmEmail(req, res, next){
    const user = await User.findOne({email: req.body.email });
    if(!user){
      next();
      return
    }

    if(user.emailVerfication && user.emailVerficationExpires !== undefined ){
      req.flash('error', 'You have to first confirm Your Email');
      return res.redirect('/user/login')
    }
    next();
  }

  static passwordreset (req, res ) {
    res.render('passwordreset');
  }

  static async forgotPassword (req, res ) {
    const user = await User.findOne({email: req.body.email });
    if(!user){
      req.flash('success', 'A password reset has been mailed to you');
      return res.redirect('/user/login')
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
    res.redirect('/user/login');
  }

  static async reset (req, res ) {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if(!user) {
      req.flash('error', 'Password reset token is not invalid or has expired');
      return res.redirect('/user/login');
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
      res.redirect('/user/login');
    }

      const newPassword = req.body.password
            user.setPassword(newPassword, () => {
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
            user.save()
            req.flash('success', '💃 Nice! Your password has been reset! You are can now login!');
            res.redirect('/user/login');
   })

}

static async getAcccountDetails (req, res) {
  const user = await User.findOne({_id: req.user._id})
  res.render('profile', {user})
}
 
 
static async editAccount (req, res) {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, user, {
        new: true,
        runValidators: true
    }).exec()
    req.flash('success', 'User Acoount Successfully Updateded!!')
    res.redirect('/user/accunt')



}

static isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
      next(); 
      return;
    }
    req.flash('error', 'Oops you must be logged in to do that!');
    req.session.oldUrl = req.url;
    console.log(req.session.oldUrl)

    res.redirect('/user/login');
  }


static logout (req, res) {
    req.logout();
    req.flash('success', 'You are now logged out! 👋');
    res.redirect('/');
  }

}

export default Users;
