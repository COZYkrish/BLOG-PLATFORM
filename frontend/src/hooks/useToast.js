import { useCallback, useEffect, useState } from 'react';

let toastState = [];
const listeners = new Set();

const notify = () => {
    listeners.forEach((listener) => listener(toastState));
};

export const useToast = () => {
    const [toasts, setToasts] = useState(toastState);

    useEffect(() => {
        listeners.add(setToasts);
        return () => listeners.delete(setToasts);
    }, []);

    const addToast = useCallback((message, type = 'success', duration = 3000) => {
        const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        toastState = [...toastState, { id, message, type }];
        notify();

        if (duration) {
            setTimeout(() => {
                toastState = toastState.filter((t) => t.id !== id);
                notify();
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        toastState = toastState.filter((t) => t.id !== id);
        notify();
    }, []);

    return { toasts, addToast, removeToast };
};
