import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };

    const icons = {
        success: CheckCircle,
        error: XCircle,
        warning: AlertCircle,
        info: AlertCircle
    };

    const Icon = icons[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2`}
        >
            <Icon size={20} />
            <span>{message}</span>
        </motion.div>
    );
};

export const ToastContainer = ({ toasts, onRemove }) => {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => onRemove(toast.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
