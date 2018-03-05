class Validate {
  static signup(req, res, next) {
    req.sanitizeBody('name');
    req.checkBody('username', 'You must supply a name!').notEmpty();
    req.checkBody('phone', 'You must supply a Phone Number! 11 Digit').notEmpty().isLength({min:11});
    req.checkBody('gender', 'You must supply your gender!').notEmpty();
    req.checkBody('address', 'You must supply your address!').notEmpty();
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail(
        {
        remove_dots: false, 
        remove_extension: false, 
        gmail_remove_subaddress: false 
        }
    );
    req.checkBody('password', 'Password Cannot be Blank! Not less than five words').notEmpty().isLength({min:6});
    req.checkBody('confirmPassword', 'Oops! Your passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
      req.flash('Sign up error', errors.map(err => err.msg))
      res.render('signup', {title: 'Signup', body: req.body, flashes: req.flash() })
      return;
    }
    next();
  }

  static login(req, res, next) {
   req.checkBody('email', 'That Email is not valid!').isEmail();
   req.sanitizeBody('email').normalizeEmail(
        {
        remove_dots: false, 
        remove_extension: false, 
        gmail_remove_subaddress: false 
        }
    );
    req.checkBody('password', 'Password Cannot be Blank!').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
       req.flash('login error', errors.map(err => err.msg))
       res.render('login', {title: 'Login', body: req.body, flashes: req.flash() })
      return; // stop the fn from running
    }
    next(); // there were no errors!
  }

  

   static addservice (req, res, next) {
   req.checkBody('servicetype', 'That Email is not valid!').notEmpty();
   req.sanitizeBody('email').normalizeEmail(
        {
        remove_dots: false, 
        remove_extension: false, 
        gmail_remove_subaddress: false 
        }
    );
    req.checkBody('address', 'location Cannot be Blank!').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
       req.flash('Error!!', errors.map(err => err.msg))
       res.render('addservice', {title: 'Add Service', body: req.body, flashes: req.flash() })
      return; // stop the fn from running
    }
    next(); // there were no errors!
  }

 static resetpassword(req, res, next) {
   req.checkBody('password', 'password cannot be empty!').notEmpty();
   req.checkBody('confirmPassword', 'Oops! Your passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
       req.flash('Password Reset error', errors.map(err => err.msg))
       res.render('resetpassword', {title: 'Rest Password', body: req.body, flashes: req.flash() })
      return; // stop the fn from running
    }
    next(); // there were no errors!
  }

  static addProduct(req, res, next) {
    req.checkBody('category', 'You must supply a Category!').notEmpty();
    req.checkBody('productname', 'You must supply a Productname!').notEmpty();
    req.checkBody('price', 'You must supply a Price!').notEmpty();
    req.checkBody('picture', 'You must add a Picture!').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
       req.flash('Add Product error', errors.map(err => err.msg))
       res.render('productform', {title: 'Product Form', body: req.body, flashes: req.flash() })
      return; // stop the fn from running
    }
    next(); // there were no errors!
  }

  static payOrder(req, res, next) {
    req.checkBody('location', 'You must supply a location').notEmpty();
    req.checkBody('time', 'You must supply the time').notEmpty();
    req.checkBody('address', 'You must supply your Aaddress').notEmpty();
    req.checkBody('date', 'You must supply the date').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
       req.flash('Order Error', errors.map(err => err.msg))
       res.render('orderservice', {title: 'Order Product', body: req.body, flashes: req.flash() })
      return; // stop the fn from running
    }
    next(); // there were no errors!
  }
}


export default Validate;
