import express from 'express';
import { getClients, addClient, getTestimonials, addTestimonial } from '../controllers/otherController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/clients').get(getClients).post(protect, addClient);
router.route('/testimonials').get(getTestimonials).post(addTestimonial);

export default router;
