# 🚀 Quick Start Guide

## Step-by-Step Setup

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Get MongoDB Atlas Connection String
- Visit: https://www.mongodb.com/cloud/atlas
- Create a free account
- Create a cluster
- Get your connection string (looks like: `mongodb+srv://...`)

### 3️⃣ Create .env File
```bash
# Create .env file in root directory with:
MONGODB_URI=mongodb+srv://your-username:your-password@cluster-name.mongodb.net/blog_database?retryWrites=true&w=majority
PORT=3000
```

### 4️⃣ Run the Server
```bash
# Development (with auto-reload)
npm run dev

# Or production
npm start
```

### 5️⃣ Open in Browser
```
http://localhost:3000
```

## ✨ What You Can Do

✅ **Create**: Add new blog posts with image, title, tags, description
✅ **Read**: View all blogs in a table or view individual blog details
✅ **Update**: Edit existing blogs and replace images
✅ **Delete**: Remove blogs (with confirmation)

## 📸 Features

- 🖼️ **Image Upload**: Upload images for each blog
- 🏷️ **Tags**: Add multiple tags to organize blogs
- 📝 **Rich Descriptions**: Full text descriptions
- 📅 **Timestamps**: Automatic creation and update dates
- 🗂️ **File Management**: Automatic cleanup of old images

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| `Cannot find module` | Run `npm install` again |
| `MongoDB connection failed` | Check MongoDB URI in .env |
| `Port 3000 already in use` | Change PORT in .env to 3001, 3002, etc |
| `Uploads folder not found` | It will be created automatically on first use |

---

That's it! Your blog system is ready to use! 🎉
