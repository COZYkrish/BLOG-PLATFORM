import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { Input, PrimaryButton } from '../components/UI';
import { validateEmail, validatePassword } from '../utils/helpers';
import { Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const { register } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const getPasswordStrength = (pwd) => {
        if (pwd.length < 6) return { level: 'weak', color: 'text-red-400' };
        if (pwd.length < 10) return { level: 'medium', color: 'text-yellow-400' };
        return { level: 'strong', color: 'text-green-400' };
    };

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
            await register(name, email, password);
            addToast('Account created successfully! Welcome to LuminaBlog', 'success');
            navigate('/dashboard');
        } catch (err) {
            addToast(err.message || 'Registration failed', 'error');
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

    const passwordStrength = getPasswordStrength(password);

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
                        Join LuminaBlog
                    </h1>
                    <p className="text-gray-400">Create your account and start writing</p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-gray-700/50 p-8 shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Full Name
                            </label>
                            <Input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (errors.name) setErrors({ ...errors, name: '' });
                                }}
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                            )}
                        </motion.div>

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

                            {/* Password Strength Indicator */}
                            {password && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full ${
                                                    passwordStrength.level === 'weak' ? 'bg-red-500' :
                                                    passwordStrength.level === 'medium' ? 'bg-yellow-500' :
                                                    'bg-green-500'
                                                }`}
                                                animate={{ 
                                                    width: passwordStrength.level === 'weak' ? '33%' :
                                                           passwordStrength.level === 'medium' ? '66%' : '100%'
                                                }}
                                            />
                                        </div>
                                        <span className={`text-xs font-semibold ${passwordStrength.color}`}>
                                            {passwordStrength.level}
                                        </span>
                                    </div>
                                </motion.div>
                            )}

                            {errors.password && (
                                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                            )}
                        </motion.div>

                        {/* Confirm Password Field */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                                    }}
                                    className={errors.confirmPassword ? 'border-red-500' : ''}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                            )}
                        </motion.div>

                        {/* Terms Checkbox */}
                        <motion.div variants={itemVariants} className="flex gap-2">
                            <input type="checkbox" required className="w-4 h-4 rounded accent-blue-500 mt-1" />
                            <label className="text-sm text-gray-400">
                                I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                            </label>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div variants={itemVariants}>
                            <PrimaryButton
                                type="submit"
                                disabled={loading}
                                className={`w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Creating account...' : 'Create Account'}
                            </PrimaryButton>
                        </motion.div>
                    </form>
                </motion.div>

                {/* Login Link */}
                <motion.p 
                    variants={itemVariants}
                    className="text-center text-gray-400 text-sm mt-6"
                >
                    Already have an account?{' '}
                    <Link 
                        to="/login" 
                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    >
                        Sign in
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Register;
