import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Save, Loader, Plus, X } from 'lucide-react';
import { blogAPI, uploadAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { generateSlug } from '../utils/helpers';
import { Input, TextArea, Select, Button } from '../components/UI';

const CreateBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToast } = useToast();

    const [loading, setLoading] = useState(!!id);
    const [submitting, setSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        image: '',
        slug: '',
    });

    const [errors, setErrors] = useState({});

    const categories = ['Tech', 'Travel', 'Lifestyle', 'Business', 'Design', 'Food', 'Health', 'Education'];

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (id) {
            fetchBlog();
        }
    }, [id, user, navigate]);

    const fetchBlog = async () => {
        try {
            setLoading(true);
            // Get blog by ID or slug
            const blog = await blogAPI.getById(id);
            setFormData({
                title: blog.title,
                content: blog.content,
                category: blog.category,
                image: blog.image,
                slug: blog.slug,
            });
            setTags(blog.tags || []);
            setImagePreview(blog.image);
        } catch (error) {
            addToast('Error loading blog', 'error');
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Auto-generate slug from title
            ...(name === 'title' && { slug: generateSlug(value) }),
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploadingImage(true);
            const formDataObj = new FormData();
            formDataObj.append('file', file);

            const response = await uploadAPI.image(formDataObj);
            setFormData(prev => ({ ...prev, image: response.url }));
            setImagePreview(response.url);
            addToast('Image uploaded successfully', 'success');
        } catch (error) {
            addToast('Error uploading image', 'error');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.content.trim()) newErrors.content = 'Content is required';
        if (!formData.category) newErrors.category = 'Category is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            addToast('Please fill in all required fields', 'warning');
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                ...formData,
                tags,
            };

            let newBlog;
            if (id) {
                await blogAPI.update(id, payload);
                addToast('Blog updated successfully!', 'success');
                newBlog = { slug: formData.slug };
            } else {
                newBlog = await blogAPI.create(payload);
                addToast('Blog created successfully!', 'success');
            }

            navigate(`/blog/${newBlog.slug}`);
        } catch (error) {
            addToast(error.message || 'Error saving blog', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="animate-spin mx-auto mb-4" size={40} />
                    <p className="text-gray-400">Loading blog...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-bold text-white mb-2">
                        {id ? 'Edit Blog Post' : 'Create New Blog Post'}
                    </h1>
                    <p className="text-gray-400">Write a compelling blog post that engages your readers</p>
                </motion.div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Blog Title *
                        </label>
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter an engaging title..."
                            error={errors.title}
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Slug
                        </label>
                        <Input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleInputChange}
                            placeholder="Auto-generated from title"
                            disabled
                        />
                        <p className="text-xs text-gray-500 mt-1">Auto-generated from title</p>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Category *
                        </label>
                        <Select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            options={[{ value: '', label: 'Select a category' }, ...categories.map(cat => ({ value: cat, label: cat }))]}
                            error={errors.category}
                        />
                    </div>

                    {/* Featured Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Featured Image
                        </label>
                        <div className="space-y-4">
                            {imagePreview && (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg border border-gray-700"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData(prev => ({ ...prev, image: '' }));
                                            setImagePreview('');
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-red-500/20 rounded hover:bg-red-500/30 text-red-400"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            )}

                            <label className="block">
                                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                                    <Upload className="mx-auto mb-2 text-gray-500" size={32} />
                                    <p className="text-sm font-medium text-gray-300">
                                        {uploadingImage ? 'Uploading...' : 'Click to upload image'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 5MB</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploadingImage}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Content *
                        </label>
                        <TextArea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="Write your blog content here... (supports markdown)"
                            rows={12}
                            error={errors.content}
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Tags
                        </label>
                        <div className="flex gap-2 mb-2">
                            <Input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddTag();
                                    }
                                }}
                                placeholder="Add tags (press Enter)..."
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={handleAddTag}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                            >
                                <Plus size={18} />
                                Add
                            </motion.button>
                        </div>

                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <motion.div
                                        key={tag}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm flex items-center gap-2"
                                    >
                                        #{tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="hover:text-red-400 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={submitting}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <Loader size={20} className="animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    {id ? 'Update Blog' : 'Publish Blog'}
                                </>
                            )}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 bg-slate-900 text-gray-300 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </motion.button>
                    </motion.div>
                </motion.form>
            </div>
        </div>
    );
};

export default CreateBlog;
