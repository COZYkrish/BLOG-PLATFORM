import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Blogs from './pages/Blogs';
import Dashboard from './pages/Dashboard';
import CreateBlog from './pages/CreateBlog';
import SingleBlog from './pages/SingleBlog';
import Bookmarks from './pages/Bookmarks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create" element={<CreateBlog />} />
          <Route path="blog/:slug" element={<SingleBlog />} />
          <Route path="bookmarks" element={<Bookmarks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
