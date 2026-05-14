# 🚀 LuminaBlog - Full-Stack Blog Platform With Comments

LuminaBlog is a modern, production-style blogging platform built with the MERN stack. It supports authentication, blog publishing, comments, likes, bookmarks, dashboard analytics, Cloudinary image uploads, search, filters, and a premium animated dark UI.

The project is designed as a complete full-stack application: a React + Vite frontend communicates with a Node.js + Express API, while MongoDB stores users, posts, bookmarks, likes, and comments.

---

## 📸 Preview

![LuminaBlog Home Page](<PHOTOS/HOME PAGE.png>)

| Home Page | Explore Page | Create Blog |
| --- | --- | --- |
| ![Home Page](<PHOTOS/HOME PAGE.png>) | ![Explore Page](<PHOTOS/explore page.png>) | ![Create Blog](<PHOTOS/CREATE BLOG.png>) |

---

## ✨ Key Features

### 🔐 Authentication

- User registration and login
- Password hashing with `bcryptjs`
- JWT-based authentication
- Token storage in `localStorage`
- Protected frontend routes
- Authenticated backend middleware
- Auto-login using saved token

### 📝 Blog System

- Create blog posts
- Edit existing posts
- Delete own posts
- Save posts as draft or publish
- Generate unique slugs
- Upload cover images through Cloudinary
- Track post views
- Display author information
- Show related posts

### 💬 Comment System

- Add comments on blog detail pages
- Show username and timestamp
- Chronological comment ordering
- Delete only your own comments
- Instant UI updates after add/delete

### ❤️ Likes

- One like per user per post
- Toggle like/unlike
- Like count updates immediately
- Likes are stored as user IDs on the blog document

### 🔖 Bookmarks

- Save blogs to personal bookmarks
- View saved blogs on `/bookmarks`
- Remove bookmarks
- Bookmarks are stored per user

### 🔎 Search, Categories, And Tags

- Search by title and content
- Filter by category
- Filter by tag
- Sort by latest, popular, and most liked
- Query-driven URL filters

### 📊 Dashboard

- User profile summary
- Total posts
- Total likes received
- Total views
- Total comments
- List of user's posts
- Edit and delete controls

### 🎨 UI / UX

- Premium dark SaaS-style interface
- Glassmorphism cards
- Gradient buttons
- Framer Motion page and card animations
- Toast notifications
- Skeleton loaders
- Empty states
- Responsive navigation
- Mobile-first layouts
- Optional light mode preference

---

## 🧱 Tech Stack

### Frontend

| Technology | Purpose |
| --- | --- |
| React | UI library |
| Vite | Development server and production build |
| Tailwind CSS | Styling system |
| Framer Motion | Animations |
| React Router DOM | Multi-page routing |
| Axios | HTTP client |
| Lucide React | Icons |

### Backend

| Technology | Purpose |
| --- | --- |
| Node.js | Runtime |
| Express.js | REST API server |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| Bcryptjs | Password hashing |
| Cloudinary | Image hosting |
| Multer | File upload middleware |

---

## 🌐 Pages And Routes

<!-- | Route | Page | Description |
| --- | --- | --- |
| `/` | Home | Hero, featured blogs, latest posts, categories |
| `/login` | Login | Animated login form with validation |
| `/register` | Register | Signup form with password strength indicator |
| `/blogs` | Blogs | Searchable and filterable blog listing |
| `/blog/:slug` | Single Blog | Full post, likes, bookmarks, comments, related posts |
| `/create` | Create Blog | Protected editor for new posts |
| `/edit/:id` | Edit Blog | Protected editor for existing posts |
| `/dashboard` | Dashboard | User stats and post management |
| `/bookmarks` | Bookmarks | Saved posts list |
| `/settings` | Settings | Profile, password, and theme preferences | -->

---

## 📁 Project Structure

```text
blogging platform/
├── README.md
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   ├── bookmarkController.js
│   │   └── commentController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── Blog.js
│   │   ├── Comment.js
│   │   └── User.js
│   └── routes/
│       ├── authRoutes.js
│       ├── blogRoutes.js
│       ├── bookmarkRoutes.js
│       ├── commentRoutes.js
│       └── uploadRoutes.js
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── assets/
        │   └── hero.png
        ├── components/
        │   ├── BlogCard.jsx
        │   ├── Footer.jsx
        │   ├── Navbar.jsx
        │   ├── Skeletons.jsx
        │   ├── States.jsx
        │   ├── Toast.jsx
        │   └── UI.jsx
        ├── context/
        │   ├── AuthContext.jsx
        │   └── AuthContextCore.js
        ├── hooks/
        │   ├── useAuth.js
        │   └── useToast.js
        ├── layouts/
        │   └── Layout.jsx
        ├── pages/
        │   ├── Blogs.jsx
        │   ├── Bookmarks.jsx
        │   ├── CreateBlog.jsx
        │   ├── Dashboard.jsx
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Settings.jsx
        │   └── SingleBlog.jsx
        ├── services/
        │   └── api.js
        └── utils/
            └── helpers.js
```

---

## ⚙️ Environment Variables

Create `backend/.env` using `backend/.env.example`.

```env
MONGODB_URI=mongodb://localhost:27017/luminablog
JWT_SECRET=your_secure_jwt_secret
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Optional frontend environment variable:

```env
VITE_API_URL=http://localhost:5000/api
```

If `VITE_API_URL` is not set, the frontend defaults to:

```text
http://localhost:5000/api
```

---

## 🚀 How To Run Locally

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Start MongoDB

Use either local MongoDB or MongoDB Atlas.

For local MongoDB:

```bash
mongod
```

### 4. Start Backend Server

```bash
cd backend
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

### 5. Start Frontend App

```bash
cd frontend
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 🔄 Full Application Workflows

### 🔐 Authentication Workflow

1. User submits the register form.
2. Backend validates name, email, and password.
3. Backend checks whether the email already exists.
4. Password is hashed with `bcryptjs`.
5. User is saved in MongoDB.
6. JWT token is generated.
7. Token is returned to frontend and stored in `localStorage`.
8. Axios sends the token in the `Authorization` header for protected requests.
9. Backend `protect` middleware verifies the token before protected actions.

### 📝 Blog Creation Workflow

1. User opens `/create`.
2. Protected route checks whether the user is logged in.
3. User enters title, content, category, tags, status, and optional cover image.
4. If an image is selected, frontend sends it to `/api/upload`.
5. Backend uploads the image to Cloudinary.
6. Cloudinary returns a secure image URL.
7. Frontend sends blog data to `/api/blogs`.
8. Backend creates a unique slug.
9. Blog is saved in MongoDB.
10. User is redirected to the published blog or dashboard if saved as draft.

### ✏️ Blog Editing Workflow

1. User opens `/edit/:id`.
2. Frontend fetches the user's blogs.
3. The selected blog is loaded into the editor.
4. User updates content, category, tags, image, or status.
5. Backend verifies ownership.
6. Blog is updated in MongoDB.
7. User is redirected to the updated post or dashboard.

### 🗑️ Blog Delete Workflow

1. User clicks delete in dashboard.
2. Frontend asks for confirmation.
3. DELETE request is sent to `/api/blogs/:id`.
4. Backend verifies ownership.
5. Blog is removed.
6. Related comments are removed.
7. Dashboard refreshes.

### ❤️ Like Workflow

1. Logged-in user clicks like.
2. Frontend sends POST request to `/api/blogs/:id/like`.
3. Backend checks whether the user's ID already exists in the likes array.
4. If liked, backend removes the user ID.
5. If not liked, backend adds the user ID.
6. Updated like count is returned.
7. UI updates instantly.

### 🔖 Bookmark Workflow

1. Logged-in user clicks save/bookmark.
2. Frontend sends POST request to `/api/bookmarks/:blogId`.
3. Backend checks the user's bookmarks array.
4. Blog ID is added or removed.
5. Bookmarks page fetches saved posts from `/api/bookmarks`.

### 💬 Comment Workflow

1. Logged-in user writes a comment on `/blog/:slug`.
2. Frontend sends comment text and blog ID to `/api/comments`.
3. Backend validates the blog exists.
4. Comment is saved with user ID and blog ID.
5. Comment is returned with populated user info.
6. UI appends the new comment without a full page refresh.
7. Users can delete only their own comments.

### 🔎 Search And Filter Workflow

1. User opens `/blogs`.
2. Frontend fetches categories and tags.
3. User types search text or selects filters.
4. Query params update in the URL.
5. Frontend requests `/api/blogs?search=value&category=value&tag=value&sort=latest`.
6. Backend builds a MongoDB query.
7. Matching published blogs are returned.
8. Blog grid updates.

### 📊 Dashboard Workflow

1. Logged-in user opens `/dashboard`.
2. Frontend requests `/api/blogs/my-blogs`.
3. Frontend requests `/api/blogs/stats`.
4. Backend aggregates total posts, likes, views, and comments.
5. Dashboard renders stats cards and the user's blog list.

---

## 🗄️ Database Models

### User

```js
{
  name: String,
  email: String,
  password: String,
  avatar: String,
  bookmarks: [BlogId],
  createdAt: Date,
  updatedAt: Date
}
```

### Blog

```js
{
  title: String,
  slug: String,
  content: String,
  image: String,
  category: String,
  tags: [String],
  status: "draft" | "published",
  author: UserId,
  likes: [UserId],
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Comment

```js
{
  text: String,
  user: UserId,
  blog: BlogId,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Reference

### Auth Routes

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Register a user |
| POST | `/api/auth/login` | Public | Login user |
| POST | `/api/auth/logout` | Public | Clear auth cookie |
| GET | `/api/auth/me` | Private | Get current user |
| PUT | `/api/auth/profile` | Private | Update profile |
| PUT | `/api/auth/change-password` | Private | Change password |

### Blog Routes

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/api/blogs` | Public | Get published blogs |
| GET | `/api/blogs/categories` | Public | Get categories |
| GET | `/api/blogs/tags` | Public | Get tags |
| GET | `/api/blogs/:slug` | Public | Get blog by slug |
| GET | `/api/blogs/related/:id` | Public | Get related posts |
| GET | `/api/blogs/my-blogs` | Private | Get logged-in user's blogs |
| GET | `/api/blogs/stats` | Private | Get dashboard stats |
| POST | `/api/blogs` | Private | Create blog |
| PUT | `/api/blogs/:id` | Private | Update own blog |
| DELETE | `/api/blogs/:id` | Private | Delete own blog |
| POST | `/api/blogs/:id/like` | Private | Toggle like |

### Comment Routes

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/api/comments/:blogId` | Public | Get comments for blog |
| POST | `/api/comments` | Private | Add comment |
| DELETE | `/api/comments/:id` | Private | Delete own comment |

### Bookmark Routes

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/api/bookmarks` | Private | Get saved blogs |
| POST | `/api/bookmarks/:blogId` | Private | Toggle bookmark |

### Upload Routes

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/upload` | Private | Upload image to Cloudinary |

---

## 🧪 Sample API Testing

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Demo User\",\"email\":\"demo@example.com\",\"password\":\"password123\"}"
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"demo@example.com\",\"password\":\"password123\"}"
```

### Get Blogs

```bash
curl "http://localhost:5000/api/blogs?search=react&category=Tech&sort=latest"
```

### Create Blog

```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d "{\"title\":\"My First Blog\",\"content\":\"Hello world\",\"category\":\"Tech\",\"tags\":[\"react\",\"node\"],\"status\":\"published\"}"
```

---

## 🎨 Design System

### Theme

- Default dark theme
- Optional light mode preference
- High contrast text
- Soft borders and glass panels
- Gradient CTAs

### UI Patterns

- Cards for blog previews and dashboard items
- Skeleton loaders during network requests
- Toasts for success and error feedback
- Responsive grids
- Mobile navigation menu
- Framer Motion hover and page animations

### Main Colors

| Name | Hex |
| --- | --- |
| Primary Blue | `#3B82F6` |
| Secondary Purple | `#A855F7` |
| Accent Pink | `#EC4899` |
| Dark Background | `#020617` |
| Card Background | `#0F172A` |

---

## 🛡️ Security Notes

- Passwords are never stored as plain text.
- Protected routes require a valid JWT.
- Backend verifies ownership before editing or deleting blogs.
- Backend verifies ownership before deleting comments.
- Sensitive keys must stay in `.env`.
- Never commit real Cloudinary or MongoDB credentials.

---

## 📦 Production Build

### Frontend

```bash
cd frontend
npm run build
```

The production files are generated in:

```text
frontend/dist
```

### Backend

```bash
cd backend
npm start
```

---

## 🚢 Deployment Guide

### Frontend Deployment

Recommended platforms:

- Vercel
- Netlify
- Render Static Site

Build command:

```bash
npm run build
```

Output folder:

```text
dist
```

### Backend Deployment

Recommended platforms:

- Render
- Railway
- Fly.io
- Heroku-compatible Node hosts

Start command:

```bash
npm start
```

Required environment variables:

```env
MONGODB_URI=
JWT_SECRET=
PORT=
NODE_ENV=production
CORS_ORIGIN=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Database

Use MongoDB Atlas for production.

1. Create an Atlas cluster.
2. Add database user credentials.
3. Allow your backend server IP.
4. Copy the connection string.
5. Set it as `MONGODB_URI`.

---

## 🧰 Useful Scripts

### Frontend

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Create production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

### Backend

| Command | Description |
| --- | --- |
| `npm run dev` | Start backend with Nodemon |
| `npm start` | Start backend with Node |

---

## 🐞 Troubleshooting

### Cloudinary: Unknown API key

Your Cloudinary credentials are placeholders or incorrect. Update:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Then restart the backend.

### MongoDB connection error

Check:

- MongoDB is running locally, or Atlas URI is correct.
- Username and password are correct.
- Atlas network access allows your IP.

### CORS error

Set backend `.env`:

```env
CORS_ORIGIN=http://localhost:5173
```

Restart backend after changing `.env`.

### Frontend cannot reach backend

Check that backend is running:

```text
http://localhost:5000
```

Then verify frontend API base URL:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ✅ Current Status

- Authentication flow implemented
- Blog CRUD implemented
- Draft/publish support implemented
- Likes implemented
- Bookmarks implemented
- Comments implemented
- Dashboard analytics implemented
- Search and filters implemented
- Cloudinary image upload implemented
- Responsive UI implemented
- Dark/light preference implemented

---

## 📄 License

This project is available for learning, portfolio, and personal use. Add a dedicated license file if you plan to publish it publicly.

---

## 👨‍💻 Author

Built as a full-stack MERN blogging platform with a professional SaaS-style interface.

**LuminaBlog** - Write, publish, discuss, and save the stories that matter. ✨
