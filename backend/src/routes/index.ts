import { Router } from 'express';
import authRoutes from './auth.routes';
import menuRoutes from './menu.routes';
import reservationRoutes from './reservation.routes';
import orderRoutes from './order.routes';
// import adminRoutes from './admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/menu', menuRoutes);
router.use('/reservations', reservationRoutes);
router.use('/orders', orderRoutes);
// router.use('/admin', adminRoutes);

export default router;
