import express from 'express';
import * as authController from '../controllers/auth';

const router = express.Router();

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/user', authController.loadUser);

export default router;