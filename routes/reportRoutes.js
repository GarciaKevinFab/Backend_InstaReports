import express from 'express';
import {
    createReport,
    getReports,
    updateReport,
    deleteReport,
} from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createReport).get(protect, getReports);
router.route('/:id').put(protect, updateReport).delete(protect, deleteReport);

export default router;
