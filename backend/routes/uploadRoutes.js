import express from 'express';
import { upload } from '../middleware/upload.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const uploadImage = (req, res, next) => {
    upload.single('image')(req, res, (error) => {
        if (error) {
            return res.status(400).json({
                message: error.message || 'Image upload failed. Check Cloudinary configuration.'
            });
        }
        next();
    });
};

router.post('/', protect, uploadImage, (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }
        res.json({ url: req.file.path });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
