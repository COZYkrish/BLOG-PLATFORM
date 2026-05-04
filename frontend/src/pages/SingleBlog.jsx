import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    ArrowLeft,
    Calendar,
    Eye,
    Loader,
    Trash2,
} from 'lucide-react';
import { blogAPI, commentAPI, bookmarkAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { formatDate, formatTimeAgo } from '../utils/helpers';
import { PageSkeleton } from '../components/Skeletons';
import { ErrorState, EmptyState } from '../components/States';
import BlogCard from '../components/BlogCard';
import { TextArea } from '../components/UI';

const SingleBlog = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToast } = useToast();

    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [deletingCommentId, setDeletingCommentId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogData();
    }, [slug]);

    const fetchBlogData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [blogData, commentsData, relatedData] = await Promise.all([
                blogAPI.getBySlug(slug),
                commentAPI.getByBlog(slug),
                blogAPI.getRelated(slug),
            ]);

            setBlog(blogData);
            setComments(commentsData || []);
            setRelatedBlogs(relatedData || []);

            // Check if liked and bookmarked
            if (user && blogData) {
                setIsLiked(blogData.likes?.includes(user._id) || false);
                setIsBookmarked(user.bookmarks?.includes(blogData._id) || false);
            }
        } catch (err) {
            setError('Failed to load blog');
            addToast('Error loading blog', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (!user) {
            addToast('Please log in to like blogs', 'warning');
            navigate('/login');
            return;
        }

        try {
            await blogAPI.like(blog._id);
            setIsLiked(!isLiked);
            setBlog(prev => ({
                ...prev,
                likes: isLiked
                    ? prev.likes.filter(id => id !== user._id)
                    : [...(prev.likes || []), user._id],
            }));
            addToast(isLiked ? 'Like removed' : 'Blog liked!', 'success');
        } catch (err) {
            addToast('Error liking blog', 'error');
        }
    };

    const handleBookmark = async () => {
        if (!user) {
            addToast('Please log in to bookmark blogs', 'warning');
            navigate('/login');
            return;
        }

        try {
            await bookmarkAPI.toggle(blog._id);
            setIsBookmarked(!isBookmarked);
            addToast(isBookmarked ? 'Bookmark removed' : 'Blog bookmarked!', 'success');
        } catch (err) {
            addToast('Error bookmarking blog', 'error');
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();

        if (!user) {
            addToast('Please log in to comment', 'warning');
            navigate('/login');
            return;
        }

        if (!commentText.trim()) {
            addToast('Comment cannot be empty', 'warning');
            return;
        }

        try {
            setSubmittingComment(true);
            const newComment = await commentAPI.create(blog._id, { text: commentText });
            setComments([newComment, ...comments]);
            setCommentText('');
            addToast('Comment added successfully', 'success');
        } catch (err) {
            addToast('Error adding comment', 'error');
        } finally {
            setSubmittingComment(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            setDeletingCommentId(commentId);
            await commentAPI.delete(commentId);
            setComments(comments.filter(c => c._id !== commentId));
            addToast('Comment deleted', 'success');
        } catch (err) {
            addToast('Error deleting comment', 'error');
        } finally {
            setDeletingCommentId(null);
        }
    };

    const handleShare = () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: blog.title,
                url,
            });
        } else {
            navigator.clipboard.writeText(url);
            addToast('Link copied to clipboard', 'success');
        }
    };

    if (loading) return <PageSkeleton />;

    if (error || !blog)
        return (
            <ErrorState
                title="Blog not found"
                description="The blog you're looking for doesn't exist or has been removed."
                onRetry={() => navigate('/blogs')}
            />
        );

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate(-1)}
                className="fixed top-24 left-4 z-40 p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-gray-300 hover:text-white transition-all"
            >
                <ArrowLeft size={20} />
            </motion.button>

            {/* Main Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Hero Image */}
                {blog.image && (
                    <motion.img
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-96 object-cover rounded-2xl mb-12 shadow-2xl"
                    />
                )}

                {/* Title & Meta */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
                        {/* Author Info */}
                        <div className="flex items-center gap-3 hover:text-primary transition-colors">
                            <img
                                src={blog.author?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                                alt={blog.author?.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="text-white font-medium">{blog.author?.name}</p>
                                <p className="text-xs text-gray-500">{formatDate(blog.createdAt)}</p>
                            </div>
                        </div>

                        <div className="h-5 w-px bg-gray-700"></div>

                        {/* Stats */}
                        <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{formatDate(blog.createdAt)}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Eye size={16} />
                            <span>{blog.views || 0} views</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Heart size={16} />
                            <span>{blog.likes?.length || 0} likes</span>
                        </div>
                    </div>

                    {/* Category & Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        {blog.category && (
                            <Link
                                to={`/blogs?category=${blog.category}`}
                                className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/30 transition-colors"
                            >
                                {blog.category}
                            </Link>
                        )}
                        {blog.tags?.map(tag => (
                            <Link
                                key={tag}
                                to={`/blogs?tag=${tag}`}
                                className="px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium hover:bg-secondary/30 transition-colors"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-4 mb-12 py-6 border-t border-b border-gray-800"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                            isLiked
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : 'bg-slate-900 text-gray-300 hover:text-white border border-gray-800 hover:border-red-500/50'
                        }`}
                    >
                        <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                        <span>{blog.likes?.length || 0} Likes</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-gray-300 hover:text-white border border-gray-800 hover:border-blue-500/50 transition-all"
                    >
                        <MessageCircle size={18} />
                        <span>{comments.length} Comments</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-gray-300 hover:text-white border border-gray-800 hover:border-green-500/50 transition-all"
                    >
                        <Share2 size={18} />
                        <span>Share</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBookmark}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                            isBookmarked
                                ? 'bg-accent/20 text-accent border border-accent/30'
                                : 'bg-slate-900 text-gray-300 hover:text-white border border-gray-800 hover:border-accent/50'
                        }`}
                    >
                        <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                        <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
                    </motion.button>
                </motion.div>

                {/* Blog Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-invert max-w-none mb-16"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Comments Section */}
                <motion.section
                    id="comments"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="border-t border-gray-800 pt-12"
                >
                    <h2 className="text-2xl font-bold text-white mb-8">Comments ({comments.length})</h2>

                    {user ? (
                        <form onSubmit={handleAddComment} className="mb-12">
                            <TextArea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Share your thoughts..."
                                rows={4}
                                disabled={submittingComment}
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={submittingComment || !commentText.trim()}
                                className="mt-4 px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {submittingComment && <Loader size={16} className="animate-spin" />}
                                {submittingComment ? 'Posting...' : 'Post Comment'}
                            </motion.button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-900 border border-gray-800 rounded-lg p-6 mb-12 text-center"
                        >
                            <p className="text-gray-300 mb-4">Log in to comment on this blog</p>
                            <Link
                                to="/login"
                                className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Log In
                            </Link>
                        </motion.div>
                    )}

                    {/* Comments List */}
                    <div className="space-y-4">
                        {comments.length === 0 ? (
                            <EmptyState
                                icon={MessageCircle}
                                title="No comments yet"
                                description="Be the first to share your thoughts on this blog post."
                            />
                        ) : (
                            comments.map((comment, index) => (
                                <motion.div
                                    key={comment._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-slate-900 border border-gray-800 rounded-lg p-6"
                                >
                                    <div className="flex items-start gap-4 justify-between">
                                        <div className="flex items-start gap-4 flex-1">
                                            <img
                                                src={
                                                    comment.user?.avatar ||
                                                    'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
                                                }
                                                alt={comment.user?.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-white">{comment.user?.name}</p>
                                                <p className="text-xs text-gray-400 mb-2">
                                                    {formatTimeAgo(comment.createdAt)}
                                                </p>
                                                <p className="text-gray-300">{comment.text}</p>
                                            </div>
                                        </div>

                                        {user?._id === comment.user?._id && (
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleDeleteComment(comment._id)}
                                                disabled={deletingCommentId === comment._id}
                                                className="p-2 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                                            >
                                                {deletingCommentId === comment._id ? (
                                                    <Loader size={16} className="animate-spin" />
                                                ) : (
                                                    <Trash2 size={16} />
                                                )}
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.section>
            </article>

            {/* Related Blogs */}
            {relatedBlogs.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-900/50 border-t border-gray-800 py-16 mt-20"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-white mb-12">Related Blogs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedBlogs.map((relatedBlog) => (
                                <BlogCard key={relatedBlog._id} blog={relatedBlog} />
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}
        </div>
    );
};

export default SingleBlog;
