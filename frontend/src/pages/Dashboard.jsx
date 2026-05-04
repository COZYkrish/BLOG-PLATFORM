import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Heart, MessageCircle, TrendingUp, Loader } from 'lucide-react';
import { blogAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { formatDate } from '../utils/helpers';
import { PageSkeleton } from '../components/Skeletons';
import { EmptyState } from '../components/States';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToast } = useToast();

    const [blogs, setBlogs] = useState([]);
    const [stats, setStats] = useState({
        totalPosts: 0,
        totalLikes: 0,
        totalViews: 0,
        totalComments: 0,
    });
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        fetchDashboardData();
    }, [user, navigate]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [blogsResponse, statsResponse] = await Promise.all([
                blogAPI.getUserBlogs(),
                blogAPI.getStats(),
            ]);
            const blogsData = blogsResponse.data || [];
            const statsData = statsResponse.data || {};

            setBlogs(blogsData);

            // Calculate stats
            const totalLikes = (blogsData || []).reduce((sum, blog) => sum + (blog.likes?.length || 0), 0);
            const totalViews = (blogsData || []).reduce((sum, blog) => sum + (blog.views || 0), 0);
            const totalComments = (blogsData || []).reduce((sum, blog) => sum + (blog.comments?.length || 0), 0);

            setStats({
                totalPosts: statsData.totalPosts ?? blogsData.length,
                totalLikes: statsData.totalLikes ?? totalLikes,
                totalViews: statsData.totalViews ?? totalViews,
                totalComments: statsData.totalComments ?? totalComments,
            });
        } catch (error) {
            addToast('Error loading dashboard', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBlog = async (blogId) => {
        if (!window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
            return;
        }

        try {
            setDeletingId(blogId);
            await blogAPI.delete(blogId);
            setBlogs(blogs.filter(b => b._id !== blogId));
            addToast('Blog deleted successfully', 'success');
            // Recalculate stats
            await fetchDashboardData();
        } catch (error) {
            addToast('Error deleting blog', 'error');
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <PageSkeleton />;

    return (
        <div className="min-h-screen bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
                            Welcome back, {user?.name.split(' ')[0]}!
                        </h1>
                        <p className="text-gray-400">Manage your blog posts and track your performance</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/create')}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all whitespace-nowrap"
                    >
                        <Plus size={20} />
                        New Post
                    </motion.button>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                >
                    {/* Total Posts */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-br from-slate-900 to-slate-950 border border-gray-800 rounded-xl p-6 hover:border-primary/50 transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Total Posts</p>
                                <p className="text-3xl font-bold text-white">{stats.totalPosts}</p>
                            </div>
                            <div className="p-3 bg-primary/20 rounded-lg">
                                <TrendingUp className="text-primary" size={24} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Total Views */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-br from-slate-900 to-slate-950 border border-gray-800 rounded-xl p-6 hover:border-secondary/50 transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Total Views</p>
                                <p className="text-3xl font-bold text-white">{stats.totalViews.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-secondary/20 rounded-lg">
                                <Eye className="text-secondary" size={24} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Total Likes */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-br from-slate-900 to-slate-950 border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Total Likes</p>
                                <p className="text-3xl font-bold text-white">{stats.totalLikes}</p>
                            </div>
                            <div className="p-3 bg-red-500/20 rounded-lg">
                                <Heart className="text-red-400" size={24} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Total Comments */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-br from-slate-900 to-slate-950 border border-gray-800 rounded-xl p-6 hover:border-accent/50 transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Total Comments</p>
                                <p className="text-3xl font-bold text-white">{stats.totalComments}</p>
                            </div>
                            <div className="p-3 bg-accent/20 rounded-lg">
                                <MessageCircle className="text-accent" size={24} />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Blog Posts Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Your Blog Posts</h2>

                    {blogs.length === 0 ? (
                        <EmptyState
                            icon={Plus}
                            title="No blog posts yet"
                            description="Start creating your first blog post to see it here"
                            actionLabel="Create Blog Post"
                            actionLink="/create"
                        />
                    ) : (
                        <div className="space-y-4">
                            {blogs.map((blog, index) => (
                                <motion.div
                                    key={blog._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-gradient-to-r from-slate-900 to-slate-950 border border-gray-800 rounded-xl p-6 hover:border-primary/50 transition-all group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        {/* Blog Info */}
                                        <Link
                                            to={`/blog/${blog.slug}`}
                                            className="flex-1 hover:opacity-80 transition-opacity min-w-0"
                                        >
                                            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm line-clamp-1 mb-3">
                                                {blog.content.substring(0, 100)}...
                                            </p>
                                            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                                                <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                                                    {blog.category}
                                                </span>
                                                <span>{formatDate(blog.createdAt)}</span>
                                            </div>
                                        </Link>

                                        {/* Stats */}
                                        <div className="flex flex-wrap gap-4 md:gap-6">
                                            <div className="text-center">
                                                <Eye className="text-gray-500 mx-auto mb-1" size={18} />
                                                <p className="text-white font-semibold">{blog.views || 0}</p>
                                                <p className="text-xs text-gray-500">Views</p>
                                            </div>
                                            <div className="text-center">
                                                <Heart className="text-gray-500 mx-auto mb-1" size={18} />
                                                <p className="text-white font-semibold">{blog.likes?.length || 0}</p>
                                                <p className="text-xs text-gray-500">Likes</p>
                                            </div>
                                            <div className="text-center">
                                                <MessageCircle className="text-gray-500 mx-auto mb-1" size={18} />
                                                <p className="text-white font-semibold">{blog.comments?.length || 0}</p>
                                                <p className="text-xs text-gray-500">Comments</p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => navigate(`/edit/${blog._id}`)}
                                                className="p-2.5 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                                                title="Edit blog"
                                            >
                                                <Edit size={18} />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleDeleteBlog(blog._id)}
                                                disabled={deletingId === blog._id}
                                                className="p-2.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
                                                title="Delete blog"
                                            >
                                                {deletingId === blog._id ? (
                                                    <Loader size={18} className="animate-spin" />
                                                ) : (
                                                    <Trash2 size={18} />
                                                )}
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
