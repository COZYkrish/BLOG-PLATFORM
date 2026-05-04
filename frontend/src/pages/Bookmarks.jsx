import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Trash2 } from 'lucide-react';
import { bookmarkAPI } from '../services/api';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import BlogCard from '../components/BlogCard';
import { BlogCardSkeleton } from '../components/Skeletons';
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

const Bookmarks = () => {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);

    useEffect(() => {
        if (user) fetchBookmarks();
    }, [user]);

    const fetchBookmarks = async () => {
        try {
            setLoading(true);
            const data = await bookmarkAPI.getAll();
            setBookmarks(data || []);
        } catch (error) {
            addToast('Error loading bookmarks', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveBookmark = async (blogId) => {
        try {
            setRemovingId(blogId);
            await bookmarkAPI.toggle(blogId);
            setBookmarks(bookmarks.filter(b => b._id !== blogId));
            addToast('Bookmark removed', 'success');
        } catch (error) {
            addToast('Error removing bookmark', 'error');
        } finally {
            setRemovingId(null);
        }
    };

    const handleLike = async (blogId) => {
        // Re-fetch bookmarks to keep them in sync
        await fetchBookmarks();
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <Bookmark className="text-primary" size={32} />
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            My Bookmarks
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg">
                        {bookmarks.length} {bookmarks.length === 1 ? 'blog saved' : 'blogs saved'}
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <BlogCardSkeleton key={i} />
                        ))}
                    </div>
                ) : bookmarks.length > 0 ? (
                    /* Bookmarks Grid */
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {bookmarks.map((blog) => (
                            <motion.div
                                key={blog._id}
                                variants={itemVariants}
                                className="relative group"
                            >
                                <BlogCard blog={blog} onLike={handleLike} />
                                
                                {/* Remove Button */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleRemoveBookmark(blog._id)}
                                    disabled={removingId === blog._id}
                                    className="absolute top-4 right-4 bg-red-500/10 hover:bg-red-500/20 backdrop-blur-sm p-2.5 rounded-lg text-red-400 hover:text-red-300 transition-all duration-200 z-20 disabled:opacity-50 border border-red-500/20 hover:border-red-500/40"
                                >
                                    <Trash2 size={18} />
                                </motion.button>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    /* Empty State */
                    <EmptyState
                        icon={Bookmark}
                        title="No bookmarks yet"
                        description="Start bookmarking blogs to save them for later reading. Explore our collection and save your favorites!"
                        actionLabel="Explore Blogs"
                        actionLink="/blogs"
                    />
                )}
            </div>
        </div>
    );
};

export default Bookmarks;
