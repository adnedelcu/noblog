import { Router } from "express";
import { index, show, store, destroy } from '../controllers/posts.js';
import asyncHandler from "../middleware/async-handler.js";

const router = Router({ mergeParams: true });

router.get('/', asyncHandler(index));
router.get('/:post', asyncHandler(show));
router.post('/', asyncHandler(store));
router.delete('/:post', asyncHandler(destroy));

export default router;
