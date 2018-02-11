import express from 'express';
import dotenv from 'dotenv';
//import { validator, auth } from '../middleware';

const router = express.Router();

dotenv.config();


/* GET Home Page. */

router.get('/', (req, res) => {
  res.status(200)
    .send({ message: 'welcome to Tru Beauty' });
});


export default router;
