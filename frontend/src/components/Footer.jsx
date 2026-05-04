import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Mail, Radio, Send } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

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
        <motion.footer 
            className="bg-gradient-to-b from-slate-950 to-slate-900 border-t border-gray-800/50 mt-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                            ✨ LuminaBlog
                        </h3>
                        <p className="text-gray-400 text-sm">
                            A modern platform for writers, thinkers, and creators to share their stories.
                        </p>
                    </motion.div>

                    {/* Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <div className="space-y-2">
                            <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm block">Home</Link>
                            <Link to="/blogs" className="text-gray-400 hover:text-blue-400 transition-colors text-sm block">Explore</Link>
                            <Link to="/create" className="text-gray-400 hover:text-blue-400 transition-colors text-sm block">Write</Link>
                        </div>
                    </motion.div>

                    {/* Resources */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-white font-semibold mb-4">Resources</h4>
                        <div className="space-y-2">
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm block">Documentation</a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm block">API Docs</a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm block">Blog Guide</a>
                        </div>
                    </motion.div>

                    {/* Social */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <motion.a 
                                href="#"
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                            >
                                <Radio size={20} />
                            </motion.a>
                            <motion.a 
                                href="#"
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                            >
                                <Send size={20} />
                            </motion.a>
                            <motion.a 
                                href="#"
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                            >
                                <Code2 size={20} />
                            </motion.a>
                            <motion.a 
                                href="mailto:hello@luminablog.com"
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                            >
                                <Mail size={20} />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    className="border-t border-gray-800 pt-8"
                    variants={itemVariants}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p className="text-gray-400 text-sm">
                            &copy; {currentYear} LuminaBlog. All rights reserved.
                        </p>
                        <div className="flex gap-6 mt-4 md:mt-0 text-sm">
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;
