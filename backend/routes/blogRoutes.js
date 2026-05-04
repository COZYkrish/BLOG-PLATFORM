import express from 'express';
import { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog, toggleLike } from '../controllers/blogController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(protect, createBlog);

router.route('/:slug')
    .get(getBlogBySlug);

router.route('/:id')
    .put(protect, updateBlog)
    .delete(protect, deleteBlog);

router.post('/:id/like', protect, toggleLike);

export default router;
