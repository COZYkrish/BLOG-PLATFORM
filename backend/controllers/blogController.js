import Blog from '../models/Blog.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

const createSlug = (title = '') => title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .substring(0, 70);

export const getBlogs = async (req, res) => {
    try {
        const { search, category, tag, sort } = req.query;
        let query = { status: 'published' };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }

        if (category) {
            query.category = category;
        }

        if (tag) {
            query.tags = { $in: [tag] };
        }

        let sortOption = { createdAt: -1 };
        if (sort === 'popular') {
            sortOption = { views: -1, createdAt: -1 };
        } else if (sort === 'trending') {
            sortOption = { likesCount: -1, createdAt: -1 };
        }

        let blogs = await Blog.find(query).populate('author', 'name avatar');

        if (sort === 'trending') {
            blogs = blogs.sort((a, b) => b.likes.length - a.likes.length || b.createdAt - a.createdAt);
        } else {
            blogs = await Blog.find(query)
                .populate('author', 'name avatar')
                .sort(sortOption);
        }

        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug })
            .populate('author', 'name avatar email')
            .populate({
                path: 'likes',
                select: '_id'
            });

        if (blog) {
            blog.views += 1;
            await blog.save();
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRelatedBlogs = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const relatedBlogs = await Blog.find({
            $or: [
                { category: blog.category },
                { tags: { $in: blog.tags } }
            ],
            _id: { $ne: blog._id }
        })
            .populate('author', 'name avatar')
            .limit(3);

        res.json(relatedBlogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBlog = async (req, res) => {
    try {
        const { title, content, image, category, tags, status = 'published' } = req.body;

        if (!title || !content || !category) {
            return res.status(400).json({ message: 'Title, content, and category are required' });
        }

        let slug = createSlug(req.body.slug || title);
        const baseSlug = slug;
        let suffix = 1;
        while (await Blog.findOne({ slug })) {
            slug = `${baseSlug}-${suffix}`;
            suffix += 1;
        }

        const slugExists = false;
        if (slugExists) {
            return res.status(400).json({ message: 'Blog with this slug already exists' });
        }

        const blog = new Blog({
            title,
            slug,
            content,
            image,
            category,
            tags: Array.isArray(tags) ? tags.filter(Boolean) : [],
            status,
            author: req.user._id
        });

        const createdBlog = await blog.save();
        await createdBlog.populate('author', 'name avatar');
        res.status(201).json(createdBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this blog' });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.image = req.body.image || blog.image;
        blog.category = req.body.category || blog.category;
        blog.tags = req.body.tags || blog.tags;
        blog.status = req.body.status || blog.status;
        if (req.body.title && req.body.title !== blog.title) {
            let slug = createSlug(req.body.title);
            const baseSlug = slug;
            let suffix = 1;
            while (await Blog.findOne({ slug, _id: { $ne: blog._id } })) {
                slug = `${baseSlug}-${suffix}`;
                suffix += 1;
            }
            blog.slug = slug;
        }

        const updatedBlog = await blog.save();
        await updatedBlog.populate('author', 'name avatar');
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this blog' });
        }

        await blog.deleteOne();
        await Comment.deleteMany({ blog: blog._id });
        res.json({ message: 'Blog removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleLike = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const userLiked = blog.likes.includes(req.user._id);

        if (userLiked) {
            blog.likes = blog.likes.filter(id => id.toString() !== req.user._id.toString());
        } else {
            blog.likes.push(req.user._id);
        }

        await blog.save();
        res.json({ 
            likes: blog.likes,
            liked: !userLiked,
            likesCount: blog.likes.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id })
            .populate('author', 'name avatar')
            .sort({ createdAt: -1 });

        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogStats = async (req, res) => {
    try {
        const stats = await Blog.aggregate([
            { $match: { author: req.user._id } },
            {
                $group: {
                    _id: null,
                    totalPosts: { $sum: 1 },
                    totalLikes: { $sum: { $size: '$likes' } },
                    totalViews: { $sum: '$views' }
                }
            }
        ]);
        const blogIds = await Blog.find({ author: req.user._id }).distinct('_id');
        const totalComments = await Comment.countDocuments({ blog: { $in: blogIds } });

        res.json({ ...(stats[0] || { totalPosts: 0, totalLikes: 0, totalViews: 0 }), totalComments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Blog.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTags = async (req, res) => {
    try {
        const tags = await Blog.distinct('tags');
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
