import Blog from '../models/Blog.js';

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name avatar').sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name avatar');
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

export const createBlog = async (req, res) => {
    try {
        const { title, slug, content, image, category, tags } = req.body;
        
        const blogExists = await Blog.findOne({ slug });
        if (blogExists) {
            return res.status(400).json({ message: 'Blog with this slug already exists' });
        }

        const blog = new Blog({
            title,
            slug,
            content,
            image,
            category,
            tags,
            author: req.user._id
        });

        const createdBlog = await blog.save();
        res.status(201).json(createdBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            if (blog.author.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to update this blog' });
            }

            blog.title = req.body.title || blog.title;
            blog.content = req.body.content || blog.content;
            blog.image = req.body.image || blog.image;
            blog.category = req.body.category || blog.category;
            blog.tags = req.body.tags || blog.tags;

            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            if (blog.author.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to delete this blog' });
            }

            await blog.deleteOne();
            res.json({ message: 'Blog removed' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleLike = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            if (blog.likes.includes(req.user._id)) {
                blog.likes = blog.likes.filter(id => id.toString() !== req.user._id.toString());
            } else {
                blog.likes.push(req.user._id);
            }
            await blog.save();
            res.json(blog.likes);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
