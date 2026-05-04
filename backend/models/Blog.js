import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    image: { type: String, default: '' },
    category: { type: String, required: true },
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: { type: Number, default: 0 }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
