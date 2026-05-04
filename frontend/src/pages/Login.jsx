import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center py-20 px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 bg-dark/50 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-2xl"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Welcome Back</h2>
                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input 
                            type="email" 
                            required
                            className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input 
                            type="password" 
                            required
                            className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-primary hover:bg-blue-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95"
                    >
                        Sign In
                    </button>
                </form>
                
                <p className="mt-6 text-center text-gray-400 text-sm">
                    Don't have an account? <Link to="/register" className="text-primary hover:text-blue-400 font-medium">Register here</Link>
                </p>
            </motion.div>
        </div>
    );
};
export default Login;
