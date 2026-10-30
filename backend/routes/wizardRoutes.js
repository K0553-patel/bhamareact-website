import express from 'express';
import { initWizard, nextStep } from '../controllers/wizardController.js';

const router = express.Router();

router.post('/init', initWizard);
router.post('/next', nextStep);

export default router;
