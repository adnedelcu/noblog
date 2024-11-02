import { Router } from "express";
import { index, show, store, destroy } from '../controllers/users.js';
import asyncHandler from "../middleware/async-handler.js";

const router = Router({ mergeParams: true });

router.get('/', asyncHandler(index));
router.get('/:user', asyncHandler(show));
router.post('/', asyncHandler(store));
router.delete('/:user', asyncHandler(destroy));

export default router;
