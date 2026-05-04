import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Eye } from 'lucide-react';
import { formatTimeAgo, truncateText } from '../utils/helpers';

const BlogCard = ({ blog, onLike, isLiked = false }) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <Link to={`/blog/${blog.slug}`}>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all h-full flex flex-col shadow-lg hover:shadow-blue-500/20">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                        {blog.image ? (
                            <img 
                                src={blog.image} 
                                alt={blog.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">No Image</span>
                            </div>
                        )}
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                {blog.category}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                        {/* Author */}
                        <div className="flex items-center gap-2 mb-3">
                            <img 
                                src={blog.author?.avatar || 'https://via.placeholder.com/32'} 
                                alt={blog.author?.name}
                                className="w-6 h-6 rounded-full"
                            />
                            <div className="text-xs">
                                <p className="font-semibold text-gray-200">{blog.author?.name || 'Anonymous'}</p>
                                <p className="text-gray-400">{formatTimeAgo(blog.createdAt)}</p>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-blue-400 transition-colors">
                            {blog.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
                            {truncateText(blog.content.replace(/<[^>]*>/g, ''), 100)}
                        </p>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="flex gap-2 mb-4 flex-wrap">
                                {blog.tags.slice(0, 2).map((tag, idx) => (
                                    <span key={idx} className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                            <div className="flex gap-4 text-xs text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Eye size={14} />
                                    {blog.views || 0}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle size={14} />
                                    {blog.comments || 0}
                                </div>
                            </div>
                            <motion.button
                                onClick={(e) => {
                                    e.preventDefault();
                                    onLike?.(blog._id);
                                }}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className={`flex items-center gap-1 text-sm ${
                                    isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                                } transition-colors`}
                            >
                                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                                {blog.likes?.length || 0}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default BlogCard;
