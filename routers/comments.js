import { Router } from "express";
import { index, show, store, destroy } from '../controllers/comments.js';
import asyncHandler from "../middleware/async-handler.js";

const router = Router({ mergeParams: true });

router.get('/', asyncHandler(index));
router.get('/:comment', asyncHandler(show));
router.post('/', asyncHandler(store));
router.delete('/:comment', asyncHandler(destroy));

export default router;
