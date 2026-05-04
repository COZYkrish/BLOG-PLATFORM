import express from 'express';
import { toggleBookmark, getBookmarks } from '../controllers/bookmarkController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(protect, getBookmarks);

router.route('/:blogId')
    .post(protect, toggleBookmark);

export default router;
