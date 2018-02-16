class Validate {
  static signup(req, res, next) {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('number', 'You must supply a Phone Number!').notEmpty();
    //req.checkBody('gender', 'You must supply your gender!').notEmpty();
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail(
        {
        remove_dots: false, 
        remove_extension: false, 
        gmail_remove_subaddress: false 
        }
    );
    req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
    req.checkBody('confirmPassword', 'Oops! Your passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
      req.flash('errror', errors.map(err => err.msg))
      res.render('signup', {title: 'Signup', body: req.body, flashes: req.flash()})
      return;
    }
    next();
  }

  static login(req, res, next) {
    req.sanitizeBody('name');
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({ remove_dots: false, remove_extension: false, gmail_remove_subaddress: false });
    req.checkBody('password', 'Password Cannot be Blank!').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      res.status(400).send({ message: 'login errors', errors });
      
      return; // stop the fn from running
    }
    next(); // there were no errors!
  }

 

  


  static checkDate(req, res, next) {
    if ((new Date(req.body.date) - Date.now()) < 0) {
  	  return res.status(400).send({ message: 'You cant set a Past date for the event' });
    }

    if (isNaN(new Date(req.body.date))) {
      return res.status(400).send({ message: 'invalid date format make sure it\'s YYYY-MM-DD format' });
    }

    if (!req.body.time.match(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])?$/)) {
      return res.status(400).send({ messgae: 'invalid time format make sure it\'s HH:MM format 24 hours' });
    }

    if (isNaN(req.body.center)) {
      return res.status(400).send({ messgae: 'Only Number allowed for Center' });
    }


  }
}


export default Validate;
