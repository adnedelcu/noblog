import { Router } from "express";
import { index, show, store, destroy } from '../controllers/posts.js';

const router = Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', store);
router.delete('/:id', destroy);

export default router;
