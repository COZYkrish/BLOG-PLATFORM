import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed w-full z-50 bg-dark/80 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                            LuminaBlog
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                            <Link to="/blogs" className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Blogs</Link>
                        </div>
                    </div>
                    <div>
                        <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                        <Link to="/register" className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors ml-4 shadow-lg shadow-blue-500/30">Sign Up</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
