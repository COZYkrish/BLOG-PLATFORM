import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, TrendingUp } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { useToast } from '../hooks/useToast';
import BlogCard from '../components/BlogCard';
import { BlogCardSkeleton } from '../components/Skeletons';
import { EmptyState } from '../components/States';

const fallbackCategories = ['Tech', 'Travel', 'Lifestyle', 'Business', 'Design'];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

const Blogs = () => {
    const { addToast } = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState(fallbackCategories);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        tag: searchParams.get('tag') || '',
        sort: searchParams.get('sort') || 'latest'
    });

    useEffect(() => {
        const loadMeta = async () => {
            try {
                const [categoryRes, tagRes] = await Promise.all([
                    blogAPI.getCategories(),
                    blogAPI.getTags()
                ]);
                if (categoryRes?.length) setCategories(categoryRes);
                if (tagRes?.length) setTags(tagRes);
            } catch (error) {
                addToast('Error loading categories and tags', 'error');
            }
        };
        loadMeta();
    }, [addToast]);

    useEffect(() => {
        const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value));
        setSearchParams(params, { replace: true });

        const timer = setTimeout(async () => {
            try {
                setLoading(true);
                const data = await blogAPI.getAll(params);
                setBlogs(data || []);
            } catch (error) {
                addToast('Error loading blogs', 'error');
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        }, 250);

        return () => clearTimeout(timer);
    }, [filters, setSearchParams, addToast]);

    const activeFilterCount = useMemo(
        () => ['search', 'category', 'tag'].filter((key) => filters[key]).length,
        [filters]
    );

    const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

    const handleClearFilters = () => {
        setFilters({ search: '', category: '', tag: '', sort: 'latest' });
    };

    const handleLike = async (blogId) => {
        // Re-fetch blogs to keep them in sync with likes
        try {
            const data = await blogAPI.getAll(filters);
            setBlogs(data || []);
        } catch (error) {
            addToast('Error updating likes', 'error');
        }
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
                        <TrendingUp className="text-primary" size={32} />
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Explore Blogs
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg">Search by title or content, narrow by category and tags, then sort by recency or audience signal</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    {/* Sidebar Filters */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gradient-to-b from-slate-900/50 to-slate-950 border border-gray-800/50 rounded-2xl p-6 h-fit backdrop-blur-sm sticky top-20"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 text-white font-semibold">
                                <SlidersHorizontal size={18} />
                                Filters
                            </div>
                            {activeFilterCount > 0 && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={handleClearFilters}
                                    className="text-xs text-primary hover:text-accent transition-colors font-medium"
                                >
                                    Clear ({activeFilterCount})
                                </motion.button>
                            )}
                        </div>

                        {/* Search */}
                        <label className="text-sm text-gray-300 font-medium">Search</label>
                        <div className="relative mt-2 mb-6">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                value={filters.search}
                                onChange={(event) => updateFilter('search', event.target.value)}
                                placeholder="Search articles..."
                                className="w-full rounded-lg bg-slate-900 border border-gray-700 py-2.5 pl-10 pr-3 text-sm text-white placeholder-gray-500 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>

                        {/* Sort */}
                        <label className="text-sm text-gray-300 font-medium">Sort By</label>
                        <select
                            value={filters.sort}
                            onChange={(event) => updateFilter('sort', event.target.value)}
                            className="mt-2 mb-6 w-full rounded-lg bg-slate-900 border border-gray-700 p-2.5 text-sm text-white outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                        >
                            <option value="latest">Latest</option>
                            <option value="popular">Most Popular</option>
                            <option value="trending">Trending</option>
                        </select>

                        {/* Categories */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-300 font-medium mb-3">Categories</p>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <motion.button
                                        key={category}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => updateFilter('category', filters.category === category ? '' : category)}
                                        className={`px-3 py-1.5 rounded-full text-xs border font-medium transition ${
                                            filters.category === category
                                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                                                : 'bg-slate-900 text-gray-300 border-gray-700 hover:border-primary/50'
                                        }`}
                                    >
                                        {category}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <p className="text-sm text-gray-300 font-medium mb-3">Tags</p>
                            <div className="flex flex-wrap gap-2">
                                {tags.slice(0, 12).map((tag) => (
                                    <motion.button
                                        key={tag}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => updateFilter('tag', filters.tag === tag ? '' : tag)}
                                        className={`px-3 py-1.5 rounded-full text-xs border font-medium transition ${
                                            filters.tag === tag
                                                ? 'bg-secondary text-white border-secondary shadow-lg shadow-secondary/30'
                                                : 'bg-slate-900 text-gray-300 border-gray-700 hover:border-secondary/50'
                                        }`}
                                    >
                                        #{tag}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <section>
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <BlogCardSkeleton key={index} />
                                ))}
                            </div>
                        ) : blogs.length === 0 ? (
                            <EmptyState
                                icon={Search}
                                title="No blogs found"
                                description={
                                    activeFilterCount > 0
                                        ? 'Try adjusting your filters or search terms to find what you\'re looking for.'
                                        : 'No blogs available at the moment.'
                                }
                            />
                        ) : (
                            <>
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={containerVariants}
                                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                >
                                    {blogs.map((blog) => (
                                        <motion.div key={blog._id} variants={itemVariants}>
                                            <BlogCard blog={blog} onLike={handleLike} />
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Results Counter */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-12 text-center text-gray-400 text-sm"
                                >
                                    Showing <span className="text-primary font-semibold">{blogs.length}</span> blog{blogs.length !== 1 ? 's' : ''}
                                </motion.div>
                            </>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
