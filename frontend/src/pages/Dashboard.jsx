import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [userBlogs, setUserBlogs] = useState([]);
    const [stats, setStats] = useState({ totalPosts: 0, totalLikes: 0, totalViews: 0 });

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const { data } = await api.get('/blogs');
                const myBlogs = data.filter(b => b.author._id === user?._id);
                setUserBlogs(myBlogs);
                
                const totalLikes = myBlogs.reduce((acc, blog) => acc + blog.likes.length, 0);
                const totalViews = myBlogs.reduce((acc, blog) => acc + blog.views, 0);
                
                setStats({
                    totalPosts: myBlogs.length,
                    totalLikes,
                    totalViews
                });
            } catch (error) {
                console.error(error);
            }
        };
        
        if (user) {
            fetchUserBlogs();
        }
    }, [user]);

    if (!user) return <div className="text-center py-20 text-gray-400">Please log in to view your dashboard.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}</h1>
                    <button onClick={logout} className="text-sm text-red-500 hover:text-red-400 transition-colors">Logout</button>
                </div>
                <Link to="/create" className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-blue-500/30">
                    Create New Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <motion.div className="bg-dark p-6 rounded-2xl border border-gray-800" whileHover={{ y: -5 }}>
                    <h3 className="text-gray-400 mb-2 font-medium">Total Posts</h3>
                    <p className="text-4xl font-bold text-white">{stats.totalPosts}</p>
                </motion.div>
                <motion.div className="bg-dark p-6 rounded-2xl border border-gray-800" whileHover={{ y: -5 }}>
                    <h3 className="text-gray-400 mb-2 font-medium">Total Likes</h3>
                    <p className="text-4xl font-bold text-primary">{stats.totalLikes}</p>
                </motion.div>
                <motion.div className="bg-dark p-6 rounded-2xl border border-gray-800" whileHover={{ y: -5 }}>
                    <h3 className="text-gray-400 mb-2 font-medium">Total Views</h3>
                    <p className="text-4xl font-bold text-purple-500">{stats.totalViews}</p>
                </motion.div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Your Blogs</h2>
            <div className="bg-dark rounded-2xl border border-gray-800 overflow-hidden">
                {userBlogs.length === 0 ? (
                    <div className="p-10 text-center text-gray-400">You haven't written any blogs yet.</div>
                ) : (
                    <ul className="divide-y divide-gray-800">
                        {userBlogs.map(blog => (
                            <li key={blog._id} className="p-6 hover:bg-gray-800/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <Link to={`/blog/${blog.slug}`} className="text-lg font-medium hover:text-primary transition-colors">
                                        {blog.title}
                                    </Link>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(blog.createdAt).toLocaleDateString()} &bull; {blog.views} views &bull; {blog.likes.length} likes
                                    </p>
                                </div>
                                <div className="flex space-x-4">
                                    <Link to={`/edit/${blog._id}`} className="text-sm text-gray-400 hover:text-white transition-colors">Edit</Link>
                                    <button className="text-sm text-red-500 hover:text-red-400 transition-colors">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
export default Dashboard;
