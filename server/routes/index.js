import express from 'express';
import dotenv from 'dotenv';
import users from '../controllers/UserController'
//import { validator, auth } from '../middleware';

const router = express.Router();

dotenv.config();


/* GET Home Page. */

router.get('/', (req, res) => {
   res.render('home', {title: 'TruBeauty'})
});


//router.post('/user/signup', users.signup)

export default router;
