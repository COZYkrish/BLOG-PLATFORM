import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { PrimaryButton, SecondaryButton, Input } from '../components/UI';
import { validateEmail, validatePassword } from '../utils/helpers';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            addToast('Please fix the errors below', 'error');
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            addToast('Welcome back!', 'success');
            navigate('/dashboard');
        } catch (err) {
            addToast(err.message || 'Login failed', 'error');
        } finally {
            setLoading(false);
        }
    };

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
        <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400">Sign in to continue to LuminaBlog</p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-gray-700/50 p-8 shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Email Address
                            </label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors({ ...errors, email: '' });
                                }}
                                className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && (
                                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                            )}
                        </motion.div>

                        {/* Password Field */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors({ ...errors, password: '' });
                                    }}
                                    className={errors.password ? 'border-red-500' : ''}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                            )}
                        </motion.div>

                        {/* Remember & Forgot */}
                        <motion.div 
                            variants={itemVariants}
                            className="flex items-center justify-between text-sm"
                        >
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded accent-blue-500" />
                                <span className="text-gray-400">Remember me</span>
                            </label>
                            <Link to="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                                Forgot password?
                            </Link>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div variants={itemVariants}>
                            <PrimaryButton
                                type="submit"
                                disabled={loading}
                                className={`w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </PrimaryButton>
                        </motion.div>
                    </form>

                    {/* Divider */}
                    <motion.div variants={itemVariants} className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-700" />
                        <span className="text-xs text-gray-400">OR</span>
                        <div className="flex-1 h-px bg-gray-700" />
                    </motion.div>

                    {/* Social Login (Placeholder) */}
                    <motion.div variants={itemVariants} className="flex gap-3">
                        <button className="flex-1 py-2 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-colors text-sm text-gray-300">
                            Google
                        </button>
                        <button className="flex-1 py-2 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-colors text-sm text-gray-300">
                            GitHub
                        </button>
                    </motion.div>
                </motion.div>

                {/* Sign Up Link */}
                <motion.p 
                    variants={itemVariants}
                    className="text-center text-gray-400 text-sm mt-6"
                >
                    Don't have an account?{' '}
                    <Link 
                        to="/register" 
                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    >
                        Create one
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Login;
