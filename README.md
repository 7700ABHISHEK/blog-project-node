# 📝 Blog Management Project

A full-stack blog management application built with **Node.js**, **Express**, **MongoDB**, and **EJS**. Features admin dashboard for managing blog posts with create, read, update, and delete operations.

## ✨ Features

### Admin Dashboard
- ✅ **Add Blogs**: Create new blog posts with image, title, tags, and description
- 📊 **View All Blogs**: Table display of all published blogs
- ✏️ **Edit Blogs**: Update existing blog posts with image replacement
- 🗑️ **Delete Blogs**: Remove blogs with automatic image cleanup
- 👁️ **View Blog**: Display full blog post with all details

### Blog Post Fields
- **Blog Name**: Title of the blog post
- **Blog Picture**: Image upload and display
- **Blog Tags**: Multiple tags for categorization (comma-separated)
- **Blog Description**: Full blog content

### Database
- **MongoDB Atlas**: Cloud-based MongoDB storage
- Automatic timestamps for creation and update

## 📋 Prerequisites

- **Node.js** (v14+)
- **npm** (Node Package Manager)
- **MongoDB Atlas Account** (for database)

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user and get the connection string
5. Connection string format:
   ```
   mongodb+srv://username:password@cluster-name.mongodb.net/blog_database?retryWrites=true&w=majority
   ```

### 3. Create .env File

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then edit `.env` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/blog_database?retryWrites=true&w=majority
PORT=3000
```

### 4. Create Uploads Directory

The app will automatically create an `uploads` folder for storing images, but you can manually create it:

```bash
mkdir uploads
```

## 🏃 Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The application will start on `http://localhost:3000` by default.

## 📁 Project Structure

```
blog-project/
├── controllers/
│   └── blogController.js      # CRUD operations logic
├── models/
│   └── Blog.js                 # MongoDB Blog schema
├── routes/
│   └── blogRoutes.js           # API routes
├── views/
│   ├── admin.ejs               # Admin dashboard page
│   ├── view.ejs                # Blog detail/view page
│   └── edit.ejs                # Blog edit page
├── uploads/                    # Blog images folder (auto-created)
├── public/                     # Static files (CSS, JS, images)
├── index.js                    # Server entry point
├── package.json                # Dependencies
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## 🎯 Usage

### Admin Dashboard
1. Navigate to `http://localhost:3000/admin`
2. **Add a Blog**: 
   - Fill in the form with blog name, tags, image, and description
   - Click "Add Blog" button
3. **View Blog**: 
   - Click "👁️ View" button in the table to see full blog details
4. **Edit Blog**: 
   - Click "✏️ Edit" button to modify blog content
   - Optionally upload a new image
5. **Delete Blog**: 
   - Click "🗑️ Delete" button (with confirmation)

### Blog Viewing
- Each blog has a dedicated view page with:
  - Blog title
  - Blog image
  - All tags with # prefix
  - Full description
  - Creation date and time
  - Edit and Delete options

## 🛠️ API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/admin` | View all blogs (Admin Dashboard) |
| GET | `/blog/:id` | View single blog details |
| GET | `/blog/:id/edit` | Get edit form for blog |
| POST | `/blog/create` | Create new blog |
| POST | `/blog/:id/update` | Update existing blog |
| GET | `/blog/:id/delete` | Delete blog |

## 📸 Image Upload

- **Supported Formats**: JPG, PNG, GIF, WebP, etc.
- **Storage**: Uploaded images are stored in `/uploads` folder
- **Access**: Images are served via `/uploads/filename.jpg`
- **Replacement**: Uploading a new image when editing automatically replaces the old one

## 🔒 Security Notes

- Add authentication middleware for production use
- Validate and sanitize user input
- Implement proper error handling
- Use HTTPS in production
- Secure your MongoDB credentials

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify your MongoDB Atlas connection string
- Check that your IP is whitelisted in MongoDB Atlas security settings
- Ensure `.env` file exists and has correct `MONGODB_URI`

### Image Upload Issues
- Check that `/uploads` folder exists and has write permissions
- Verify multer configuration in `routes/blogRoutes.js`
- Check file size limits

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using the current port

## 📝 Future Enhancements

- 👤 User authentication and authorization
- 🔐 Admin login page
- 👥 User-facing blog listing page (public view)
- 🔍 Search and filter functionality
- 📄 Pagination for blogs
- 💬 Comments system
- 👍 Like/Rating system
- 📱 Responsive mobile design improvements
- 🎨 Rich text editor for descriptions
- 🏷️ Category management

## 📄 License

ISC

## 👨‍💻 Author

Your Name

---

**Happy Blogging! 📝**
