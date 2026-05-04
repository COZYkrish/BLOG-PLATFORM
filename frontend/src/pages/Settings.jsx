// Settings Page - User Profile & Preferences
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { PrimaryButton, Input } from '../components/UI';
import { Settings, Lock, User } from 'lucide-react';

const SettingsPage = () => {
    const { user, updateProfile, changePassword } = useAuth();
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);

    // Profile form state
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });

    // Password form state
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProfile(profileData);
            addToast('Profile updated successfully', 'success');
        } catch (error) {
            addToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            addToast('Passwords do not match', 'error');
            return;
        }

        setLoading(true);
        try {
            await changePassword(passwordData.oldPassword, passwordData.newPassword);
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            addToast('Password changed successfully', 'success');
        } catch (error) {
            addToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
                <p className="text-gray-400">Manage your account and preferences</p>
            </motion.div>

            {/* Tabs */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 mt-8 border-b border-gray-700">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`py-4 px-6 font-semibold transition-colors ${
                        activeTab === 'profile'
                            ? 'text-blue-400 border-b-2 border-blue-400'
                            : 'text-gray-400 hover:text-gray-300'
                    }`}
                >
                    <User className="inline mr-2" size={20} />
                    Profile
                </button>
                <button
                    onClick={() => setActiveTab('password')}
                    className={`py-4 px-6 font-semibold transition-colors ${
                        activeTab === 'password'
                            ? 'text-blue-400 border-b-2 border-blue-400'
                            : 'text-gray-400 hover:text-gray-300'
                    }`}
                >
                    <Lock className="inline mr-2" size={20} />
                    Password
                </button>
            </motion.div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <motion.form
                    onSubmit={handleProfileUpdate}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 max-w-2xl"
                >
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
                            <Input
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                            <Input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Avatar URL</label>
                            <Input
                                type="url"
                                placeholder="https://..."
                                defaultValue={user?.avatar}
                                onChange={(e) => setProfileData({ ...profileData, avatar: e.target.value })}
                            />
                        </div>

                        <PrimaryButton type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </PrimaryButton>
                    </div>
                </motion.form>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
                <motion.form
                    onSubmit={handlePasswordChange}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 max-w-2xl"
                >
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Current Password</label>
                            <Input
                                type="password"
                                value={passwordData.oldPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">New Password</label>
                            <Input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm Password</label>
                            <Input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            />
                        </div>

                        <PrimaryButton type="submit" disabled={loading}>
                            {loading ? 'Changing...' : 'Change Password'}
                        </PrimaryButton>
                    </div>
                </motion.form>
            )}
        </div>
    );
};

export default SettingsPage;
