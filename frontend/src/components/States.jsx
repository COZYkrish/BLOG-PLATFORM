import { motion } from 'framer-motion';

export const EmptyState = ({ icon: Icon, title, description, action }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 px-4"
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4"
            >
                {Icon && <Icon size={48} className="text-blue-400/50 mx-auto" />}
            </motion.div>
            
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-center max-w-md mb-6">{description}</p>
            
            {action && (
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {action}
                </motion.div>
            )}
        </motion.div>
    );
};

export const ErrorState = ({ title, message, onRetry }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center"
        >
            <h3 className="text-lg font-semibold text-red-400 mb-2">{title}</h3>
            <p className="text-red-300 mb-4">{message}</p>
            {onRetry && (
                <motion.button
                    onClick={onRetry}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all"
                >
                    Try Again
                </motion.button>
            )}
        </motion.div>
    );
};

export const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-3 border-gray-600 border-t-blue-500 rounded-full"
            />
        </div>
    );
};
