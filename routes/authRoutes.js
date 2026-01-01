import express from 'express';
import { getLogin, getSignup, loginUser, signupUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/login', getLogin);
router.post('/login', loginUser);
router.get('/signup', getSignup);
router.post('/signup', signupUser);
router.get('/logout', logoutUser);

export default router;
