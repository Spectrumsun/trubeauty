import express from 'express';
import dotenv from 'dotenv';
import csurf from 'csurf';
import productController from '../controllers/productController';
import user from '../controllers/UserController'
import signup from '../controllers/UserController';
import validation from '../middleware/validation'
import auth from '../handlers/authcontrollers'
import order from '../controllers/orderController';
import addservice from '../controllers/addSeviceController';
import admin from '../controllers/adminController'
import { catchErrors } from '../handlers/errorHandlers';
import imageUpload from '../middleware/imageUpload';
import Auth from '../middleware/auth';

const router = express.Router();
const csurfProtection = csurf();
//router.use(csurfProtection);

dotenv.config();

router.get('/', (req, res) => {
   res.render('home', {title: 'TruBeauty'})
});

//User Route
router.get('/user/login', 
    user.loginForm
)
router.post('/user/login', 
    validation.login, 
    catchErrors(user.isConfirmEmail), 
    auth.login
)

router.get('/user/signup', 
    user.signupForm
)

router.post('/user/signup',
    imageUpload.upload,
    validation.signup,
    catchErrors(imageUpload.newUpload),
    user.signup,
    user.emailVerfication
)

router.get('/user/confirmemail/:token', 
    user.confirmEmail
)

router.get('/user/passwordreset', 
    user.passwordreset
)

router.post('/user/passwordreset', 
    catchErrors(user.forgotPassword)
)

router.get('/user/account/reset/:token', 
    catchErrors(user.reset)
)

router.post('/user/account/reset/:token',
    validation.resetpassword, 
    catchErrors(user.passwordupdate)
)


router.get('/user/addservice', 
    user.isLoggedIn, 
    addservice.addServiceFrom
) 

router.post('/user/addservice', 
    validation.addservice, 
    catchErrors(addservice.addservice)
)

router.get('/user/viewproduct', 
    order.viewProducts
)

router.get('/user/orderproduct/:id',
         order.orderservice
)

//cart router
router.get('/user/addtocart/:id', 
    order.addToCart
)

router.get('/user/removeone/:id', 
    order.removeOneFromCart
)

router.get('/user/removeall/:id', 
    order.removeAll
);

router.get('/user/myCart',
    order.showCart
);

router.get('/user/checkout',
    user.isLoggedIn,
    order.checkout
)

router.post('/user/product/pay', 
    catchErrors(order.Pay)
)

router.get('/user/account',
    user.isLoggedIn,
    user.getAcccountDetails
)

router.get('/user/edit/account',
    user.isLoggedIn,
    user.editAccount
)

router.get('/user/logout', 
    user.logout
);

router.get('/order', order.orderList)

//Admin Route
router.get('/admin/',
    user.isLoggedIn,
    Auth.Admin,
    admin.adminDashBoard
);

router.get('/admin/viewproduct',
    user.isLoggedIn,
    Auth.Admin,
    productController.GetProducts
);
router.get('/admin/products', 
    user.isLoggedIn,
    Auth.Admin,
    productController.ProudctForm
);

router.post('/admin/product',
    user.isLoggedIn,
    Auth.Admin,
    imageUpload.upload,
    catchErrors(imageUpload.newUpload),
    catchErrors(productController.Addproduct)
);

router.post('/admin/product/:id',
    user.isLoggedIn,
    Auth.Admin,
    imageUpload.upload,
    catchErrors(imageUpload.editUpLoad),
    catchErrors(productController.EditProducts)
);


router.get('/admin/editproduct/:id/edit',
    user.isLoggedIn,
    Auth.Admin,
    catchErrors(productController.LoadEditProducts)
);


router.post('/admin/product/delete/:id',
    user.isLoggedIn,
    Auth.Admin,
    catchErrors(imageUpload.deleteUpLoad),
    catchErrors(productController.DeleteProduct)
);

router.get('/admin/getverifypayment',
    order.getVerifyPayment
)

router.post('/admin/verifypayment',
    catchErrors(order.verifyPayment)
)

router.get('/admin/orders', order.orderList);

router.get('/admin/findsingleorder', 
    order.getFindOrder
)

router.post('/admin/findOrders', 
    catchErrors(order.findOrder));


export default router;
