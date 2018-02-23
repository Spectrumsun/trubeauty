import express from 'express';
import dotenv from 'dotenv';
import productController from '../controllers/productController';
import user from '../controllers/UserController'
import signup from '../controllers/UserController';
import validation from '../middleware/validation'
import auth from '../handlers/authcontrollers'
import orderService from '../controllers/orderServiceController';
import addservice from '../controllers/addSeviceController';
import admin from '../controllers/adminController'
import { catchErrors } from '../handlers/errorHandlers';
import imageUpload from '../middleware/imageUpload';

const router = express.Router();

dotenv.config();

router.get('/', (req, res) => {
   res.render('home', {title: 'TruBeauty'})
});

router.get('/login', user.loginForm)
router.post('/login', validation.login, user.isConfirmEmail, auth.login)

router.get('/signup', user.signupForm)

router.post('/signup',
    imageUpload.upload,
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
router.post('/product/pay',user.isLoggedIn,
           
            catchErrors(orderService.PayforOrder))

router.post('/addservice', 
    validation.addservice, 
    catchErrors(addservice.addservice)
)

router.get('/addservice', user.isLoggedIn, 
            addservice.addServiceFrom
) 

router.get('/orderproduct/:id',
         orderService.orderservice
)

router.get('/viewproduct', orderService.viewProducts)

router.get('/admin/', admin.adminDashBoard);
router.get('/admin/viewproduct', productController.GetProducts);
router.get('/admin/products', productController.ProudctForm);

router.post('/admin/product',
    imageUpload.upload,
    catchErrors(productController.Addproduct));

router.post('/admin/product/:id', 
    imageUpload.upload,
    catchErrors(productController.EditProducts));



router.get('/admin/editproduct/:id/edit', 
    catchErrors(productController.LoadEditProducts));


router.post('/admin/product/delete/:id', 
    catchErrors(productController.DeleteProduct));



export default router;
