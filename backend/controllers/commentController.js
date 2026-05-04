import Comment from '../models/Comment.js';
import Blog from '../models/Blog.js';

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ blog: req.params.blogId })
            .populate('user', 'name avatar')
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createComment = async (req, res) => {
    try {
        const { text, blogId } = req.body;
        
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const comment = new Comment({
            text,
            user: req.user._id,
            blog: blogId
        });

        const createdComment = await comment.save();
        
        await createdComment.populate('user', 'name avatar');

        res.status(201).json(createdComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (comment) {
            if (comment.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to delete this comment' });
            }

            await comment.deleteOne();
            res.json({ message: 'Comment removed' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
