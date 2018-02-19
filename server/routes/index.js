import express from 'express';
import dotenv from 'dotenv';
import user from '../controllers/UserController'
import signup from '../controllers/UserController';
import validation from '../middleware/validation'
import auth from '../handlers/authcontrollers'
import orderService from '../controllers/orderServiceController';
import addservice from '../controllers/addSeviceController';
import admin from '../controllers/adminController'

const router = express.Router();

dotenv.config();

router.get('/', (req, res) => {
   res.render('home', {title: 'TruBeauty'})
});

router.get('/login', user.loginForm)
router.post('/login', validation.login, auth.login)

router.get('/signup', user.signupForm)
router.post('/signup',  
   validation.signup,
    user.signup,
    auth.login
)
router.get('/passwordreset', user.passwordreset)

router.get('/logout', user.logout)

router.post('/addservice', 
    validation.addservice, 
    addservice.addservice
)


router.get('/admin', admin.adminDashBoard)

router.get('/addservice', auth.isLoggedIn, 
            addservice.addServiceFrom
    ) 

router.get('/orderservice', 
         auth.isLoggedIn,
         orderService.orderserviceForm
)


export default router;
