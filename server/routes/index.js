import express from 'express';
import dotenv from 'dotenv';
import user from '../controllers/UserController'
import validation from '../middleware/validation'
import auth from '../handlers/authcontrollers'

const router = express.Router();

dotenv.config();


/* GET Home Page. */

router.get('/', (req, res) => {
   res.render('home', {title: 'TruBeauty'})
});

router.get('/login', user.loginForm)
router.get('/signup', user.signupForm)

router.post('/signup',
    validation.signup,
    auth.passport,
    user.signup
)

router.post('/login', validation.login, user.login)



export default router;
