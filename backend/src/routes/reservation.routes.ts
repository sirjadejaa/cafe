import { Router } from 'express';
import { createReservation, getMyReservations, getAllReservations, updateReservationStatus } from '../controllers/reservation.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = Router();

router.post('/', protect, createReservation);
router.get('/my', protect, getMyReservations);
router.get('/', protect, authorize('ADMIN'), getAllReservations);
router.patch('/:id/status', protect, authorize('ADMIN'), updateReservationStatus);

export default router;
