import { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const { data } = await authAPI.getProfile();
            setUser(data);
            setError(null);
        } catch (err) {
            setUser(null);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            const { data } = await authAPI.login({ email, password });
            localStorage.setItem('token', data.token);
            setUser(data);
            setError(null);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        try {
            setLoading(true);
            const { data } = await authAPI.register({ name, email, password });
            localStorage.setItem('token', data.token);
            setUser(data);
            setError(null);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setUser(null);
            localStorage.removeItem('token');
            setError(null);
        }
    };

    const updateProfile = async (data) => {
        try {
            const { data: updatedUser } = await authAPI.updateProfile(data);
            setUser(updatedUser);
            setError(null);
            return updatedUser;
        } catch (err) {
            const message = err.response?.data?.message || 'Update failed';
            setError(message);
            throw new Error(message);
        }
    };

    const changePassword = async (oldPassword, newPassword) => {
        try {
            await authAPI.changePassword({ oldPassword, newPassword });
            setError(null);
        } catch (err) {
            const message = err.response?.data?.message || 'Password change failed';
            setError(message);
            throw new Error(message);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            loading,
            error,
            updateProfile,
            changePassword
        }}>
            {children}
        </AuthContext.Provider>
    );
};
