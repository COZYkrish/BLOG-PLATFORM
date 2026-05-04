import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, LogOut, User, Settings } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        setUserMenuOpen(false);
        navigate('/');
    };

    const menuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.nav 
            className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-gray-800/50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex-shrink-0">
                        <motion.div 
                            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.05 }}
                        >
                            ✨ LuminaBlog
                        </motion.div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-2">
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/blogs">Explore</NavLink>
                            {user && (
                                <>
                                    <NavLink to="/create">Write</NavLink>
                                    <NavLink to="/bookmarks">Bookmarks</NavLink>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="relative">
                                <motion.button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 transition-all border border-blue-400/50"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <img 
                                        src={user.avatar || 'https://via.placeholder.com/32'} 
                                        alt={user.name}
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <span className="text-sm font-medium">{user.name}</span>
                                </motion.button>

                                {userMenuOpen && (
                                    <motion.div
                                        variants={menuVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="absolute right-0 mt-2 w-48 bg-slate-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
                                    >
                                        <Link 
                                            to="/dashboard" 
                                            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500/20 transition-colors text-sm"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <User size={16} /> Dashboard
                                        </Link>
                                        <Link 
                                            to="/settings" 
                                            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500/20 transition-colors text-sm"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <Settings size={16} /> Settings
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-red-500/20 transition-colors text-sm text-red-400"
                                        >
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link 
                                        to="/login" 
                                        className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                    >
                                        Login
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link 
                                        to="/register" 
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                                    >
                                        Sign Up
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-gray-300 hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        className="md:hidden pb-4 space-y-2"
                    >
                        <NavLink mobile to="/">Home</NavLink>
                        <NavLink mobile to="/blogs">Explore</NavLink>
                        {user && (
                            <>
                                <NavLink mobile to="/create">Write</NavLink>
                                <NavLink mobile to="/bookmarks">Bookmarks</NavLink>
                                <NavLink mobile to="/dashboard">Dashboard</NavLink>
                                <NavLink mobile to="/settings">Settings</NavLink>
                                <motion.button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 rounded-md text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
                                    variants={itemVariants}
                                >
                                    Logout
                                </motion.button>
                            </>
                        )}
                        {!user && (
                            <>
                                <NavLink mobile to="/login">Login</NavLink>
                                <NavLink mobile to="/register">Sign Up</NavLink>
                            </>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

const NavLink = ({ to, children, mobile = false }) => {
    return (
        <motion.div
            variants={mobile ? undefined : {}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Link 
                to={to}
                className={`${
                    mobile 
                        ? 'block px-3 py-2 rounded-md text-base' 
                        : 'px-3 py-2 rounded-md text-sm'
                } font-medium text-gray-300 hover:text-white hover:bg-blue-500/10 transition-all`}
            >
                {children}
            </Link>
        </motion.div>
    );
};

export default Navbar;
