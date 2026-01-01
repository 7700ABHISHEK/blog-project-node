# Blog Project Flow & Architecture

## User Flow Diagram

```
User Browser
    │
    ├─→ GET /
    │   └─→ Redirects to /admin
    │
    ├─→ GET /admin
    │   └─→ Admin Dashboard (List all blogs)
    │       ├─ Form to Add New Blog
    │       └─ Table with View/Edit/Delete buttons
    │
    ├─→ POST /blog/create (Upload image)
    │   └─→ Creates blog & redirects to /admin
    │
    ├─→ GET /blog/:id
    │   └─→ View Page (Full blog details)
    │       └─ Shows image, title, tags, description
    │
    ├─→ GET /blog/:id/edit
    │   └─→ Edit Form (Pre-filled data)
    │       └─ Can upload new image
    │
    ├─→ POST /blog/:id/update (Optional new image)
    │   └─→ Updates blog & redirects to /admin
    │
    └─→ GET /blog/:id/delete
        └─→ Deletes blog & redirects to /admin
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Express Server (index.js)              │
│                                                              │
│  MongoDB Connection (mongoose)                              │
│         ↓                                                    │
│    Mongoose Models (Blog)                                   │
└─────────────────────────────────────────────────────────────┘
                        ↑
         ┌──────────────┼──────────────┐
         │              │              │
    Controllers     Routes          Middleware
    (CRUD Logic)  (API Endpoints)  (Body Parser, Multer)
         │              │              │
         └──────────────┼──────────────┘
                        ↑
         ┌──────────────┼──────────────┐
         │              │              │
      Views          Static Files      Uploads
    (EJS Pages)      (CSS, JS, etc)    (Images)
         │              │              │
         └──────────────┼──────────────┘
                        ↑
                   Browser/Client
```

## Request-Response Cycle

### Create Blog
```
Client Form
    ↓
POST /blog/create
    ↓
blogController.createBlog()
    ↓
Save to MongoDB
    ↓
Save image file
    ↓
Redirect to /admin
```

### View Blog
```
Admin Dashboard
    ↓
Click View Button
    ↓
GET /blog/:id
    ↓
blogController.getBlogById()
    ↓
Fetch from MongoDB
    ↓
Render view.ejs
    ↓
Display to User
```

### Update Blog
```
Edit Page Form
    ↓
POST /blog/:id/update
    ↓
blogController.updateBlog()
    ↓
Update MongoDB
    ↓
Delete old image (if new one uploaded)
    ↓
Save new image file
    ↓
Redirect to /admin
```

### Delete Blog
```
Admin Table
    ↓
Click Delete Button
    ↓
GET /blog/:id/delete
    ↓
blogController.deleteBlog()
    ↓
Delete from MongoDB
    ↓
Delete image file
    ↓
Redirect to /admin
```

## File Upload Flow

```
File Selected in Form
    ↓
Multer Middleware
    ↓
Generate unique filename
    ↓
Save to /uploads folder
    ↓
Pass filename to Controller
    ↓
Save filename in MongoDB
    ↓
Store full image path in HTML img tag
```

## Data Flow

```
Browser (admin.ejs)
    │
    ├─ Form Input (title, tags, description, file)
    │
    └─→ Express Server
         │
         ├─→ Multer (Process file upload)
         │    └─ Save to /uploads/
         │
         ├─→ Body Parser (Parse form data)
         │    └─ Extract title, tags, description
         │
         └─→ Controller (blogController.js)
              │
              └─→ Create Blog Object
                  │
                  └─→ Mongoose Model
                      │
                      └─→ MongoDB Atlas
                           │
                           └─→ Store document with image filename
```

## Database Schema Visualization

```
Blog Document
├─ _id: ObjectId (MongoDB auto-generated)
├─ title: String
│   Example: "Getting Started with Node.js"
├─ description: String
│   Example: "Learn the basics of Node.js and Express..."
├─ tags: Array[String]
│   Example: ["Node.js", "JavaScript", "Tutorial"]
├─ image: String
│   Example: "1704067200000-1234567890-nodejs.jpg"
├─ createdAt: Date
│   Example: 2024-01-01T10:30:00Z
└─ updatedAt: Date
    Example: 2024-01-02T15:45:30Z
```

## Folder Structure with Flow

```
/uploads
  ├─ 1704067200000-blog1.jpg ←─ Stored by Multer
  ├─ 1704067300000-blog2.png
  └─ ...
       ↑
       Referenced in MongoDB
       Documents by filename

/views
  ├─ admin.ejs ←─────┐
  │  │               │
  │  └─→ Form data  │
  │      posted to  │
  │      /blog/create
  │                  │
  ├─ view.ejs ←─────┤
  │  │               │
  │  └─ Shows blog   │
  │      fetched by  │
  │      /blog/:id
  │
  └─ edit.ejs ←─────┤
     │              │
     └─→ Form data │
         posted to
         /blog/:id/update
```

## Technology Stack

```
Frontend
├─ EJS (Template Engine)
├─ HTML/CSS
└─ JavaScript

Backend
├─ Node.js (Runtime)
├─ Express.js (Web Framework)
├─ Mongoose (MongoDB ORM)
└─ Multer (File Upload)

Database
└─ MongoDB Atlas (Cloud NoSQL)

Others
├─ Dotenv (Environment Variables)
└─ Body-Parser (Request Parsing)
```

## Complete Request-Response Example

### Request: Create Blog
```
POST /blog/create
Content-Type: multipart/form-data

Body:
- title: "My First Blog"
- tags: "JavaScript,Node.js"
- description: "This is my first blog post"
- image: [binary file data]

Response:
302 Redirect
Location: /admin
```

### Database Operation:
```javascript
// Saved in MongoDB:
{
  _id: new ObjectId(),
  title: "My First Blog",
  tags: ["JavaScript", "Node.js"],
  description: "This is my first blog post",
  image: "1704067200000-blog-image.jpg",
  createdAt: new Date(),
  updatedAt: new Date()
}

// Saved File:
/uploads/1704067200000-blog-image.jpg
```

### Response: View Blog
```html
GET /blog/507f1f77bcf86cd799439011

Response HTML (rendered view.ejs):
<!DOCTYPE html>
<html>
<head>
  <title>My First Blog - Blog Post</title>
</head>
<body>
  <img src="/uploads/1704067200000-blog-image.jpg" />
  <h1>My First Blog</h1>
  <p class="tags">#JavaScript #Node.js</p>
  <p class="description">This is my first blog post</p>
</body>
</html>
```

---

This architecture ensures clean separation of concerns and scalability! 🚀
