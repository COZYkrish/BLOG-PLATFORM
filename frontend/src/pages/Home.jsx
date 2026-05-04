import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { PrimaryButton } from '../components/UI';
import { BlogCardSkeleton } from '../components/Skeletons';
import BlogCard from '../components/BlogCard';
import { ArrowRight, Sparkles } from 'lucide-react';

const Home = () => {
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [latestBlogs, setLatestBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [blogs, cats] = await Promise.all([
                    blogAPI.getAll({ sort: 'popular' }),
                    blogAPI.getCategories()
                ]);
                
                setFeaturedBlogs(blogs.slice(0, 3));
                setLatestBlogs(blogs.slice(0, 6));
                setCategories(cats.slice(0, 5));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-20 px-4">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-blob" />
                    <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto text-center"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/50 rounded-full text-sm text-blue-400">
                            <Sparkles size={16} />
                            Welcome to LuminaBlog
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                    >
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Stories that Inspire
                        </span>
                        <br />
                        <span className="text-white">Thoughts that Matter</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8"
                    >
                        Discover insights, creativity, and expertise from writers around the world. A platform where ideas flourish and voices are heard.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/blogs">
                            <PrimaryButton className="w-full sm:w-auto">
                                Explore Blogs <ArrowRight size={18} className="inline ml-2" />
                            </PrimaryButton>
                        </Link>
                        <Link to="/create">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-lg font-semibold text-white border-2 border-gray-600 hover:border-gray-500 transition-all"
                            >
                                Start Writing
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Featured Section */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Section Title */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Featured Stories
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    </motion.div>

                    {/* Featured Grid */}
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {loading ? (
                            [...Array(3)].map((_, i) => <BlogCardSkeleton key={i} />)
                        ) : (
                            featuredBlogs.map((blog) => (
                                <motion.div key={blog._id} variants={itemVariants}>
                                    <BlogCard blog={blog} />
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </motion.div>
            </section>

            {/* Categories Section */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Explore Categories
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    </motion.div>

                    {/* Category Cards */}
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-2 md:grid-cols-5 gap-4"
                    >
                        {categories.map((category, idx) => (
                            <motion.div key={idx} variants={itemVariants}>
                                <Link to={`/blogs?category=${category}`}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all text-center cursor-pointer group"
                                    >
                                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                                            {['📚', '✈️', '💼', '🎨', '🔬'][idx] || '📝'}
                                        </div>
                                        <p className="text-white font-semibold">{category}</p>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* Latest Articles */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Latest Articles
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {loading ? (
                            [...Array(6)].map((_, i) => <BlogCardSkeleton key={i} />)
                        ) : (
                            latestBlogs.map((blog) => (
                                <motion.div key={blog._id} variants={itemVariants}>
                                    <BlogCard blog={blog} />
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 rounded-2xl p-12 text-center"
                >
                    <motion.h2 
                        variants={itemVariants}
                        className="text-3xl font-bold text-white mb-4"
                    >
                        Ready to Share Your Story?
                    </motion.h2>
                    <motion.p 
                        variants={itemVariants}
                        className="text-gray-400 mb-8 max-w-2xl mx-auto"
                    >
                        Join thousands of writers and creators on LuminaBlog. Share your thoughts, ideas, and expertise with a global audience.
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <Link to="/create">
                            <PrimaryButton>Start Writing Now</PrimaryButton>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
