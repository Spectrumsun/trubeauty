import express from 'express';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import productController from '../controllers/productController';
import user from '../controllers/UserController'
import signup from '../controllers/UserController';
import validation from '../middleware/validation'
import auth from '../handlers/authcontrollers'
import orderService from '../controllers/orderServiceController';
import addservice from '../controllers/addSeviceController';
import admin from '../controllers/adminController'
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key:  process.env.API_KEY, 
    api_secret:  process.env.API_SECRET 
});

router.get('/', (req, res) => {
   res.render('home', {title: 'TruBeauty'})
});

router.get('/login', user.loginForm)
router.post('/login', validation.login, user.isConfirmEmail, auth.login)

router.get('/signup', user.signupForm)
router.post('/signup',  
   validation.signup,
    user.signup,
    user.emailVerfication
)

router.get('/account/confirmemail/:token', user.confirmEmail)

router.get('/passwordreset', user.passwordreset)
router.post('/passwordreset', catchErrors(user.forgotPassword))

router.get('/account/reset/:token', catchErrors(user.reset))

router.post('/account/reset/:token',
    validation.resetpassword, 
    catchErrors(user.passwordupdate)
  )

router.get('/logout', user.logout)

//pay for product
router.post('/product/pay',auth.isLoggedIn,
           
            catchErrors(orderService.PayforOrder))

router.post('/addservice', 
    validation.addservice, 
    catchErrors(addservice.addservice)
)

router.get('/addservice', auth.isLoggedIn, 
            addservice.addServiceFrom
) 

router.get('/orderproduct/:id',
         orderService.orderservice
)

router.get('/viewproduct', orderService.viewProducts)

router.get('/admin/', admin.adminDashBoard);
router.get('/admin/viewproduct', productController.GetProducts);
router.get('/admin/product', productController.ProudctForm);

router.post('/admin/addproduct',
    
    catchErrors(productController.Addproduct));

router.get('/admin/product/edit/:id', 
    catchErrors(productController.LoadEditProducts));

router.post('/admin/addproduct/:id', 
    catchErrors(productController.EditProducts));

router.post('/admin/product/delete/:id', 
    catchErrors(productController.DeleteProduct));



export default router;
