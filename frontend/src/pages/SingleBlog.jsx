import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const SingleBlog = () => {
    const { slug } = useParams();
    const { user } = useContext(AuthContext);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchBlogAndComments = async () => {
            try {
                const { data } = await api.get(`/blogs/${slug}`);
                setBlog(data);
                
                const commentsRes = await api.get(`/comments/${data._id}`);
                setComments(commentsRes.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogAndComments();
    }, [slug]);

    const handleLike = async () => {
        if (!user) return alert('Please login to like');
        try {
            const { data } = await api.post(`/blogs/${blog._id}/like`);
            setBlog({ ...blog, likes: data });
        } catch (error) {
            console.error(error);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        try {
            const { data } = await api.post('/comments', {
                text: newComment,
                blogId: blog._id
            });
            setComments([data, ...comments]);
            setNewComment('');
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;
    if (!blog) return <div className="text-center py-20 text-gray-400">Blog not found</div>;

    const isLiked = user && blog.likes.includes(user._id);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {blog.image && (
                    <img src={blog.image} alt={blog.title} className="w-full h-64 md:h-96 object-cover rounded-3xl mb-8 shadow-2xl" />
                )}
                
                <div className="flex items-center space-x-2 mb-6">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">{blog.category}</span>
                    <span className="text-gray-500 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span className="text-gray-500 text-sm">&bull; {blog.views} views</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{blog.title}</h1>
                
                <div className="flex items-center mb-10 pb-10 border-b border-gray-800">
                    <div className="w-12 h-12 bg-gradient-to-tr from-primary to-purple-500 rounded-full flex items-center justify-center text-xl font-bold mr-4 shadow-lg">
                        {blog.author?.name?.charAt(0) || 'A'}
                    </div>
                    <div>
                        <p className="font-medium text-lg">{blog.author?.name || 'Anonymous'}</p>
                        <p className="text-sm text-gray-500">Author</p>
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none mb-12 text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }}>
                </div>

                <div className="flex items-center space-x-4 mb-12">
                    <button 
                        onClick={handleLike}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${isLiked ? 'bg-primary/20 text-primary' : 'bg-dark border border-gray-800 text-gray-300 hover:bg-gray-800'}`}
                    >
                        <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        <span>{blog.likes.length} Likes</span>
                    </button>
                </div>

                <div className="border-t border-gray-800 pt-10">
                    <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
                    
                    {user ? (
                        <form onSubmit={handleComment} className="mb-10">
                            <textarea 
                                rows="3" required placeholder="Add a comment..."
                                className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-xl focus:ring-primary focus:border-transparent outline-none text-white mb-3 transition-all"
                                value={newComment} onChange={(e) => setNewComment(e.target.value)}
                            ></textarea>
                            <button type="submit" className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-blue-500/30">
                                Post Comment
                            </button>
                        </form>
                    ) : (
                        <div className="bg-dark p-6 rounded-2xl border border-gray-800 mb-10 text-center">
                            <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link> to add a comment.
                        </div>
                    )}

                    <div className="space-y-6">
                        {comments.map(comment => (
                            <div key={comment._id} className="bg-dark p-6 rounded-2xl border border-gray-800">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 bg-gradient-to-tr from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 shadow-inner">
                                        {comment.user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{comment.user?.name || 'User'}</p>
                                        <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300">{comment.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
export default SingleBlog;
