import { Router } from 'express';
import { createOrder, getMyOrders } from '../controllers/order.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);

export default router;
