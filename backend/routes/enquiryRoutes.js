import express from 'express';
import { submitEnquiry, getEnquiries, markAsRead, deleteEnquiry } from '../controllers/enquiryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(submitEnquiry).get(protect, getEnquiries);
router.route('/:id/read').put(protect, markAsRead);
router.route('/:id').delete(protect, deleteEnquiry);

export default router;

