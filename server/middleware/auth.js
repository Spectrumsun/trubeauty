import User from '../models/User';

require('dotenv').config({ path: '.env' });

class Auth {
  static Admin(req, res, next) {
    const roles = req.user.role;
    if (roles != process.env.ADMIN) {
        req.flash('error', 'You Dont have permission to do that!!');
        return res.redirect('/')
    }
    next();
  }
}

export default Auth;