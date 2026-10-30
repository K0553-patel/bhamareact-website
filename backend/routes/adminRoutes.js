import express from 'express';
import { loginAdmin, getDashboardStats, changePassword } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/dashboard', protect, getDashboardStats);
router.put('/password', protect, changePassword);

export default router;
