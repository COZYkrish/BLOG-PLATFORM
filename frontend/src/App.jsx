import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Blogs from './pages/Blogs';
import Dashboard from './pages/Dashboard';
import CreateBlog from './pages/CreateBlog';
import SingleBlog from './pages/SingleBlog';
import Bookmarks from './pages/Bookmarks';
import Settings from './pages/Settings';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="h-screen flex items-center justify-center" />;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blog/:slug" element={<SingleBlog />} />
            <Route path="bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
            <Route path="edit/:id" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          </Route>
        </Routes>
        <AppToasts />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppToasts() {
  const { toasts, removeToast } = useToast();
  return <ToastContainer toasts={toasts} onRemove={removeToast} />;
}

export default App;
