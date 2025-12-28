import express from 'express';
import { signup, signin, signout, getCurrentUser } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/me', authenticateToken, getCurrentUser);

export default router;
