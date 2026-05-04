import express from 'express';
import { 
    getBlogs, 
    getBlogBySlug, 
    createBlog, 
    updateBlog, 
    deleteBlog, 
    toggleLike,
    getRelatedBlogs,
    getUserBlogs,
    getBlogStats,
    getCategories,
    getTags
} from '../controllers/blogController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/categories', getCategories);
router.get('/tags', getTags);
router.get('/', getBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/related/:id', getRelatedBlogs);

// Protected routes
router.post('/', protect, createBlog);
router.get('/my-blogs', protect, getUserBlogs);
router.get('/stats', protect, getBlogStats);
router.get('/:slug', getBlogBySlug);

router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);
router.post('/:id/like', protect, toggleLike);

export default router;
