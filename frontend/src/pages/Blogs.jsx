import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await api.get('/blogs');
                setBlogs(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="animate-pulse bg-dark border border-gray-800 rounded-2xl h-80"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-10">Explore Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                    <motion.div 
                        key={blog._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-dark rounded-2xl border border-gray-800 overflow-hidden hover:shadow-xl hover:border-gray-700 transition-all group"
                    >
                        {blog.image ? (
                            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                            <div className="w-full h-48 bg-gray-800"></div>
                        )}
                        <div className="p-6">
                            <div className="flex items-center space-x-2 mb-3">
                                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
                                    {blog.category}
                                </span>
                            </div>
                            <Link to={`/blog/${blog.slug}`}>
                                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h2>
                            </Link>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{blog.content.replace(/<[^>]+>/g, '')}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>{blog.author?.name}</span>
                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
export default Blogs;
