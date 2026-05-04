import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Bookmarks = () => {
    const { user } = useContext(AuthContext);
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const { data } = await api.get('/bookmarks');
                setBookmarks(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchBookmarks();
    }, [user]);

    const removeBookmark = async (blogId) => {
        try {
            await api.post(`/bookmarks/${blogId}`);
            setBookmarks(bookmarks.filter(b => b._id !== blogId));
        } catch (error) {
            console.error(error);
        }
    };

    if (!user) return <div className="text-center py-20 text-gray-400">Please log in to view bookmarks.</div>;

    if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-10">Your Bookmarks</h1>
            
            {bookmarks.length === 0 ? (
                <div className="bg-dark p-10 rounded-2xl border border-gray-800 text-center text-gray-400">
                    You have no saved blogs yet. <Link to="/blogs" className="text-primary hover:underline">Explore blogs</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookmarks.map((blog, index) => (
                        <motion.div 
                            key={blog._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-dark rounded-2xl border border-gray-800 overflow-hidden hover:shadow-xl transition-all"
                        >
                            {blog.image ? (
                                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-gray-800"></div>
                            )}
                            <div className="p-6">
                                <Link to={`/blog/${blog.slug}`}>
                                    <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors line-clamp-2">{blog.title}</h2>
                                </Link>
                                <button 
                                    onClick={() => removeBookmark(blog._id)}
                                    className="mt-4 text-sm text-red-500 hover:text-red-400 transition-colors"
                                >
                                    Remove Bookmark
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Bookmarks;
