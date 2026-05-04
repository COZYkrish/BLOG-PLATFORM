import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                    Welcome to <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">LuminaBlog</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                    Discover stories, thinking, and expertise from writers on any topic. A premium space for modern readers and creators.
                </p>
                <Link to="/blogs" className="inline-block bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-transform hover:scale-105 shadow-lg shadow-blue-500/30">
                    Explore Blogs
                </Link>
            </motion.div>
        </div>
    );
};
export default Home;
