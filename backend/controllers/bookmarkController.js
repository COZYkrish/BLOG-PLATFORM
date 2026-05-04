import User from '../models/User.js';
import Blog from '../models/Blog.js';

export const toggleBookmark = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const blogId = req.params.blogId;

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.bookmarks.includes(blogId)) {
            user.bookmarks = user.bookmarks.filter(id => id.toString() !== blogId);
        } else {
            user.bookmarks.push(blogId);
        }

        await user.save();
        res.json(user.bookmarks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookmarks = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'bookmarks',
            populate: {
                path: 'author',
                select: 'name avatar'
            }
        });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.bookmarks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
