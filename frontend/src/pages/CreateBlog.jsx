import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) return <div className="text-center py-20 text-gray-400">Please log in to create a blog.</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let imageUrl = '';
            if (image) {
                const formData = new FormData();
                formData.append('image', image);
                const uploadRes = await api.post('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                imageUrl = uploadRes.data.url;
            }

            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

            const { data } = await api.post('/blogs', {
                title,
                slug,
                content,
                category,
                tags: tags.split(',').map(tag => tag.trim()),
                image: imageUrl
            });

            navigate(`/blog/${data.slug}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Create New Blog</h1>
            {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-dark p-8 rounded-2xl border border-gray-800">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                    <input 
                        type="text" required
                        className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-xl focus:ring-primary focus:border-transparent outline-none text-white transition-all"
                        value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Content</label>
                    <textarea 
                        required rows="10"
                        className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-xl focus:ring-primary focus:border-transparent outline-none text-white transition-all"
                        value={content} onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                        <input 
                            type="text" required placeholder="e.g. Technology"
                            className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-xl focus:ring-primary focus:border-transparent outline-none text-white transition-all"
                            value={category} onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Tags (comma separated)</label>
                        <input 
                            type="text" placeholder="e.g. react, node, tutorial"
                            className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-xl focus:ring-primary focus:border-transparent outline-none text-white transition-all"
                            value={tags} onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Cover Image</label>
                    <input 
                        type="file" accept="image/*"
                        className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-xl outline-none text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-600 transition-all cursor-pointer"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button 
                    type="submit" disabled={loading}
                    className="w-full py-4 bg-primary hover:bg-blue-600 text-white rounded-xl font-medium transition-all hover:shadow-lg disabled:opacity-50"
                >
                    {loading ? 'Publishing...' : 'Publish Blog'}
                </button>
            </form>
        </div>
    );
};
export default CreateBlog;
