import { motion } from 'framer-motion';

export const Button = ({ children, className = '', ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export const PrimaryButton = ({ children, ...props }) => (
    <Button
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
        {...props}
    >
        {children}
    </Button>
);

export const SecondaryButton = ({ children, ...props }) => (
    <Button
        className="bg-gray-700 hover:bg-gray-600 text-white"
        {...props}
    >
        {children}
    </Button>
);

export const DangerButton = ({ children, ...props }) => (
    <Button
        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50"
        {...props}
    >
        {children}
    </Button>
);

export const Input = ({ className = '', ...props }) => (
    <motion.input
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`w-full px-4 py-2 bg-slate-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all ${className}`}
        {...props}
    />
);

export const TextArea = ({ className = '', ...props }) => (
    <motion.textarea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`w-full px-4 py-2 bg-slate-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all resize-none ${className}`}
        {...props}
    />
);

export const Select = ({ options, className = '', ...props }) => (
    <motion.select
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`w-full px-4 py-2 bg-slate-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-all ${className}`}
        {...props}
    >
        {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
                {opt.label}
            </option>
        ))}
    </motion.select>
);

export const Card = ({ children, className = '' }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-gray-700/50 p-6 ${className}`}
    >
        {children}
    </motion.div>
);

export const Badge = ({ children, className = '' }) => (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 ${className}`}>
        {children}
    </span>
);
