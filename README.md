# 🚀 LuminaBlog - Production-Ready Blogging Platform

A modern, full-featured blogging platform built with React, Node.js, and MongoDB. Features beautiful animations, dark theme UI, comprehensive blog management, and real-time interactions.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

## ✨ Features

### User Features
- ✅ User authentication (Register/Login/Logout)
- ✅ Create, edit, and delete blog posts
- ✅ Like/unlike blogs
- ✅ Add and manage comments
- ✅ Bookmark favorite blogs
- ✅ User dashboard with statistics
- ✅ Profile settings and password change
- ✅ Image uploads with Cloudinary

### Blog Features
- ✅ Rich blog content with markdown support
- ✅ Categories and tags system
- ✅ Search and filter blogs
- ✅ View counter
- ✅ Related posts suggestion
- ✅ Comment system with timestamps
- ✅ Multi-author support

### UI/UX
- ✅ Beautiful dark theme with gradients
- ✅ Smooth animations (Framer Motion)
- ✅ Responsive design (mobile-first)
- ✅ Glass-morphism design patterns
- ✅ Loading skeletons
- ✅ Toast notifications
- ✅ Error boundaries

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Cloudinary** - Image hosting

## 📁 Project Structure

```
blogging-platform/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   ├── commentController.js
│   │   └── bookmarkController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Blog.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── bookmarkRoutes.js
│   │   └── uploadRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── BlogCard.jsx
    │   │   ├── Toast.jsx
    │   │   ├── UI.jsx
    │   │   ├── States.jsx
    │   │   └── Skeletons.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   └── useToast.js
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Blogs.jsx
    │   │   ├── SingleBlog.jsx
    │   │   ├── CreateBlog.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Bookmarks.jsx
    │   │   └── Settings.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── utils/
    │   │   └── helpers.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)
- Cloudinary account

### Backend Setup

1. **Clone and navigate to backend:**
```bash
cd backend
npm install
```

2. **Create .env file:**
```bash
cp .env.example .env
```

3. **Configure environment variables:**
```env
MONGODB_URI=mongodb://localhost:27017/luminablog
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGIN=http://localhost:5173
```

4. **Start MongoDB:**
```bash
# If using local MongoDB
mongod
```

5. **Start the backend server:**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend:**
```bash
cd frontend
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## ⚙️ Configuration

### Environment Variables

**Backend (.env):**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing (min 32 chars)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `CLOUDINARY_*` - Cloudinary credentials
- `CORS_ORIGIN` - Frontend URL for CORS

**Frontend:**
- Update API base URL in `src/services/api.js` if needed

## 📖 Usage

### Creating a Blog

1. Log in or create an account
2. Click "Write" in the navigation
3. Fill in the blog details:
   - Title
   - Content
   - Featured image
   - Category
   - Tags
4. Click "Publish"

### Managing Blogs

- View all your blogs in the Dashboard
- Edit blog by clicking edit icon
- Delete blog with delete button
- View blog analytics (views, likes, comments)

### Interacting with Blogs

- **Like**: Click heart icon to like/unlike
- **Comment**: Scroll to comments section to add comments
- **Bookmark**: Click bookmark icon to save for later
- **Share**: Share blogs with others

## 🔌 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register         - Create new account
POST   /api/auth/login            - Login user
POST   /api/auth/logout           - Logout user
GET    /api/auth/me               - Get user profile
PUT    /api/auth/profile          - Update profile
PUT    /api/auth/change-password  - Change password
```

### Blog Endpoints

```
GET    /api/blogs                 - Get all blogs (with search/filter)
GET    /api/blogs/categories      - Get all categories
GET    /api/blogs/tags            - Get all tags
GET    /api/blogs/slug/:slug      - Get blog by slug
GET    /api/blogs/related/:id     - Get related blogs
GET    /api/blogs/my-blogs        - Get user's blogs
GET    /api/blogs/stats           - Get user's blog stats
POST   /api/blogs                 - Create new blog
PUT    /api/blogs/:id             - Update blog
DELETE /api/blogs/:id             - Delete blog
POST   /api/blogs/:id/like        - Like/unlike blog
```

### Comment Endpoints

```
GET    /api/comments/:blogId      - Get comments for blog
POST   /api/comments              - Create comment
DELETE /api/comments/:id          - Delete comment
```

### Bookmark Endpoints

```
GET    /api/bookmarks             - Get user's bookmarks
POST   /api/bookmarks/:blogId     - Toggle bookmark
```

### Upload Endpoints

```
POST   /api/upload                - Upload image to Cloudinary
```

## 🌐 Query Parameters

### Blog List (`/api/blogs`)
- `search` - Search by title or content
- `category` - Filter by category
- `tag` - Filter by tag
- `sort` - Sort by: `latest`, `popular`, `trending`

Example:
```
GET /api/blogs?search=react&category=Tech&sort=popular
```

## 🛡️ Authentication

All protected routes require a JWT token either in:
- Cookie: `jwt`
- Header: `Authorization: Bearer <token>`

Token is automatically stored in localStorage and sent with requests.

## 🎨 Styling

### Color Scheme
- Primary: `#3B82F6` (Blue)
- Secondary: `#A855F7` (Purple)
- Accent: `#EC4899` (Pink)
- Background: `#0F172A` (Dark Slate)

### Tailwind Configuration
- Dark mode enabled
- Custom colors defined in `tailwind.config.js`
- Animation utilities for smooth transitions

## 🚀 Deployment

### Frontend Deployment (Vercel)

```bash
npm run build
# Deploy the dist folder to Vercel
```

### Backend Deployment (Railway/Heroku)

```bash
# Set environment variables on hosting platform
# Push code to git repository
# Platform auto-deploys
```

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in backend .env

### Image Hosting (Cloudinary)

1. Create Cloudinary account
2. Get credentials from dashboard
3. Update Cloudinary variables in .env

## 🐛 Troubleshooting

### CORS Errors
- Update `CORS_ORIGIN` in backend .env to match frontend URL

### Image Upload Fails
- Check Cloudinary credentials
- Verify API key and secret are correct

### JWT Errors
- Ensure JWT_SECRET is set and consistent
- Check token expiration (default: 30 days)

### MongoDB Connection Fails
- Verify MongoDB is running
- Check connection string in .env
- For MongoDB Atlas, allow IP in network access

## 📦 Dependencies

See `package.json` files for complete list of dependencies.

### Key Frontend Dependencies
- react@19.2.5
- framer-motion@12.38.0
- axios@1.16.0
- react-router-dom@7.14.2
- tailwindcss@4.2.4
- lucide-react@1.14.0

### Key Backend Dependencies
- express@5.2.1
- mongoose@9.6.1
- jsonwebtoken@9.0.3
- bcryptjs@3.0.3
- cloudinary@2.10.0
- multer@2.1.1

## 📝 License

MIT License - feel free to use this project for personal or commercial use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions:
1. Check existing issues on GitHub
2. Create a detailed bug report
3. Include error messages and steps to reproduce

---

**Happy Blogging! ✨**
