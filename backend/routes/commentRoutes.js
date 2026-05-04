import express from 'express';
import { getComments, createComment, deleteComment } from '../controllers/commentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/:blogId')
    .get(getComments);

router.route('/')
    .post(protect, createComment);

router.route('/:id')
    .delete(protect, deleteComment);

export default router;
