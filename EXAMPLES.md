# Blog Project - Example Data & Usage

## Example Blog Documents

### Document 1: Node.js Tutorial
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Getting Started with Node.js",
  "description": "Learn the fundamentals of Node.js including modules, npm, and building a simple web server. Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows you to run JavaScript outside the browser. It's perfect for building scalable server-side applications.",
  "tags": ["Node.js", "JavaScript", "Backend", "Tutorial"],
  "image": "1704067200000-nodejs-tutorial.jpg",
  "createdAt": "2024-01-01T10:30:00Z",
  "updatedAt": "2024-01-01T10:30:00Z"
}
```

### Document 2: Express.js Guide
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Express.js Framework Guide",
  "description": "A comprehensive guide to Express.js framework for building web applications. Learn about routing, middleware, error handling, and best practices. Express is a minimal and flexible web application framework that provides features for web and mobile applications.",
  "tags": ["Express.js", "Web Development", "Node.js"],
  "image": "1704067300000-expressjs-guide.jpg",
  "createdAt": "2024-01-02T14:15:00Z",
  "updatedAt": "2024-01-02T14:15:00Z"
}
```

### Document 3: MongoDB Basics
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "MongoDB Basics for Beginners",
  "description": "Introduction to MongoDB, a popular NoSQL database. Learn about collections, documents, BSON format, and how to perform CRUD operations. MongoDB is document-oriented and stores data in flexible, JSON-like documents.",
  "tags": ["MongoDB", "Database", "NoSQL"],
  "image": "1704067400000-mongodb-basics.jpg",
  "createdAt": "2024-01-03T09:45:00Z",
  "updatedAt": "2024-01-03T09:45:00Z"
}
```

## Sample Form Data

### Add Blog Form Example 1
```
Blog Name: "React Hooks Explained"
Blog Tags: "React, JavaScript, Frontend, Hooks"
Blog Picture: hooks-tutorial.png
Blog Description: 
"React Hooks are functions that let you 'hook into' React features from function components. 
They don't work inside classes — they let you use React without classes. 
Learn about useState, useEffect, useContext and custom hooks."
```

### Add Blog Form Example 2
```
Blog Name: "Building REST APIs with Node.js"
Blog Tags: "Node.js, REST API, Backend, Express"
Blog Picture: rest-api-guide.jpg
Blog Description:
"Learn how to build robust and scalable REST APIs using Node.js and Express.js. 
Topics include routing, HTTP methods, status codes, error handling, and API documentation. 
This guide covers best practices for creating professional APIs."
```

## API Request/Response Examples

### Create Blog Request
```http
POST /blog/create HTTP/1.1
Host: localhost:3000
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="title"

My Awesome Blog Post
------WebKitFormBoundary
Content-Disposition: form-data; name="tags"

JavaScript,Coding,Tutorial
------WebKitFormBoundary
Content-Disposition: form-data; name="description"

This is a detailed description of my blog post...
------WebKitFormBoundary
Content-Disposition: form-data; name="image"; filename="blog-image.jpg"
Content-Type: image/jpeg

[binary image data]
------WebKitFormBoundary--
```

### Create Blog Response
```
HTTP/1.1 302 Found
Location: /admin
```

### Get All Blogs Response
```html
<html>
  <body>
    <table>
      <tr>
        <td><img src="/uploads/1704067200000-nodejs.jpg" /></td>
        <td>Getting Started with Node.js</td>
        <td><span class="tag">Node.js</span><span class="tag">JavaScript</span></td>
        <td>Learn the fundamentals...</td>
        <td>1/1/2024</td>
        <td>
          <a href="/blog/507f1f77bcf86cd799439011">View</a>
          <a href="/blog/507f1f77bcf86cd799439011/edit">Edit</a>
          <a href="/blog/507f1f77bcf86cd799439011/delete">Delete</a>
        </td>
      </tr>
    </table>
  </body>
</html>
```

### View Blog Response
```html
<html>
  <head>
    <title>Getting Started with Node.js - Blog Post</title>
  </head>
  <body>
    <img src="/uploads/1704067200000-nodejs.jpg" />
    <h1>Getting Started with Node.js</h1>
    <p class="date">📅 January 1, 2024, 10:30 AM</p>
    <div class="tags">
      <span class="tag">#Node.js</span>
      <span class="tag">#JavaScript</span>
      <span class="tag">#Backend</span>
      <span class="tag">#Tutorial</span>
    </div>
    <p class="description">
      Learn the fundamentals of Node.js including modules, npm, and building a simple web server...
    </p>
    <a href="/blog/507f1f77bcf86cd799439011/edit">Edit Blog</a>
    <a href="/blog/507f1f77bcf86cd799439011/delete">Delete Blog</a>
  </body>
</html>
```

## File Structure Example

### Uploads Folder Structure
```
uploads/
├── 1704067200000-nodejs-tutorial.jpg
├── 1704067300000-expressjs-guide.jpg
├── 1704067400000-mongodb-basics.jpg
├── 1704067500000-react-hooks.jpg
└── 1704067600000-rest-api.jpg
```

## Blog Data Flow Example

### Creating a Blog
```
User Action: Fills form and submits
         ↓
Form Data:
  - title: "Learning Express"
  - tags: "Express,Node.js,Backend"
  - description: "Complete guide to Express framework"
  - image: express.jpg
         ↓
Controller (blogController.js)
  - Receives multipart/form-data
  - Multer saves image to /uploads/
  - Extracts form fields
  - Creates Blog object
         ↓
Database (MongoDB)
  - Stores document with:
    • title: "Learning Express"
    • tags: ["Express", "Node.js", "Backend"]
    • description: "Complete guide..."
    • image: "1704067200000-express.jpg"
    • createdAt: (auto-generated)
    • updatedAt: (auto-generated)
         ↓
File System
  - /uploads/1704067200000-express.jpg (saved)
         ↓
Response: Redirect to /admin
```

### Viewing a Blog
```
User Action: Clicks View button
         ↓
GET /blog/507f1f77bcf86cd799439011
         ↓
Controller (blogController.js)
  - Gets blog ID from URL
  - Queries MongoDB for document
         ↓
Database Response
  - Returns blog document
         ↓
View (view.ejs)
  - Renders HTML with:
    • Blog title
    • Blog image from /uploads/
    • Tags as badges
    • Full description
    • Timestamps
    • Action buttons
         ↓
Response: HTML page displayed to user
```

### Editing a Blog
```
User Action: Clicks Edit button
         ↓
GET /blog/507f1f77bcf86cd799439011/edit
         ↓
Controller
  - Queries MongoDB for blog
  - Renders edit form with pre-filled data
         ↓
User View (edit.ejs)
  - Form with current values
  - Current image preview
  - Optional file upload
         ↓
User Action: Changes data and submits
         ↓
POST /blog/507f1f77bcf86cd799439011/update
         ↓
Controller
  - If new image uploaded:
    • Delete old image from /uploads/
    • Save new image
  - Update MongoDB document
  - Update timestamps
         ↓
Database
  - Document updated with new values
         ↓
Response: Redirect to /admin
```

### Deleting a Blog
```
User Action: Clicks Delete button
         ↓
GET /blog/507f1f77bcf86cd799439011/delete
         ↓
Controller
  - Finds blog document
  - Deletes from MongoDB
  - Deletes image from /uploads/
         ↓
Response: Redirect to /admin with deleted blog removed
```

## Sample Tag Examples

Common tags you might use:

**Technology Tags:**
- JavaScript
- Node.js
- Express.js
- React
- Vue.js
- MongoDB
- SQL
- Docker
- Kubernetes

**Category Tags:**
- Tutorial
- Guide
- Best Practices
- Case Study
- Tips & Tricks
- Performance
- Security
- DevOps

**Level Tags:**
- Beginner
- Intermediate
- Advanced
- Expert

**Type Tags:**
- How-To
- Interview Questions
- Code Review
- Project Setup
- Troubleshooting
- News

## Browser Viewport Examples

### Desktop View (1920px)
```
┌────────────────────────────────────────────────────────┐
│  Blog Admin Dashboard                                   │
├────────────────────────────────────────────────────────┤
│                                                         │
│  Add New Blog Form                                     │
│  ┌─────────────┐  ┌─────────────┐                     │
│  │ Title       │  │ Tags        │                     │
│  ├─────────────┤  ├─────────────┤                     │
│  │ Description │  │ Image       │                     │
│  └─────────────┘  └─────────────┘                     │
│  [Add Blog Button]                                     │
│                                                         │
├────────────────────────────────────────────────────────┤
│                                                         │
│  All Blogs Table                                       │
│  ┌────────────────────────────────────────────────┐   │
│  │ Image │ Title │ Tags │ Desc │ Date │ Actions  │   │
│  ├────────────────────────────────────────────────┤   │
│  │ IMG1  │ Blog1 │ Tg1  │ ..   │ Date │ V E D    │   │
│  │ IMG2  │ Blog2 │ Tg2  │ ..   │ Date │ V E D    │   │
│  └────────────────────────────────────────────────┘   │
│                                                         │
└────────────────────────────────────────────────────────┘
```

### Mobile View (375px)
```
┌──────────────────────┐
│ Blog Admin Dashboard │
├──────────────────────┤
│                      │
│ Add New Blog Form    │
│ ┌────────────────┐   │
│ │ Title          │   │
│ ├────────────────┤   │
│ │ Tags           │   │
│ ├────────────────┤   │
│ │ Image          │   │
│ ├────────────────┤   │
│ │ Description    │   │
│ └────────────────┘   │
│ [Add Blog Button]    │
│                      │
├──────────────────────┤
│                      │
│ Blog 1               │
│ [Image]              │
│ Title 1              │
│ Tags                 │
│ Desc...              │
│ [V] [E] [D]          │
│                      │
│ Blog 2               │
│ [Image]              │
│ Title 2              │
│ Tags                 │
│ Desc...              │
│ [V] [E] [D]          │
│                      │
└──────────────────────┘
```

---

This covers all the data flows and examples for your blog project! 📚
