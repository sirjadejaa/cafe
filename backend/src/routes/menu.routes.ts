import { Router } from 'express';
import { getMenuItems, getMenuItemBySlug, createMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menu.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getMenuItems);
router.get('/:slug', getMenuItemBySlug);
router.post('/', protect, authorize('ADMIN'), createMenuItem);
router.put('/:id', protect, authorize('ADMIN'), updateMenuItem);
router.delete('/:id', protect, authorize('ADMIN'), deleteMenuItem);

export default router;
