import Blog from "../models/Blog.js";
import fs from "fs";
import path from "path";

// Get all blogs for admin dashboard
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("admin", { blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blogs for user/frontend
export const getAllBlogsUser = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("index", { blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single blog (for viewing)
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.render("view", { blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    let imageData = null;

    // Handle file upload
    if (req.file) {
      imageData = req.file.filename;
    }

    const blog = new Blog({
      title,
      description,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      image: imageData,
    });

    await blog.save();
    res.redirect("/admin");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get blog for editing
export const getEditBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.render("edit", { blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete old image if new one is uploaded
    if (req.file) {
      if (blog.image) {
        const oldImagePath = path.join("uploads", blog.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      blog.image = req.file.filename;
    }

    blog.title = title;
    blog.description = description;
    blog.tags = tags ? tags.split(",").map((tag) => tag.trim()) : [];
    blog.updatedAt = Date.now();

    await blog.save();
    res.redirect("/admin");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete image file
    if (blog.image) {
      const imagePath = path.join("uploads", blog.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.redirect("/admin");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
