import express from "express";
import multer from "multer";
import {
  getAllBlogs,
  getAllBlogsUser,
  getBlogById,
  createBlog,
  getEditBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// User routes (public)
router.get("/", getAllBlogsUser);

// Admin routes (protected)
router.get("/admin", isAuthenticated, getAllBlogs);
router.get("/blog/:id", getBlogById);
router.get("/blog/:id/edit", isAuthenticated, getEditBlog);
router.post("/blog/create", isAuthenticated, upload.single("image"), createBlog);
router.post("/blog/:id/update", isAuthenticated, upload.single("image"), updateBlog);
router.get("/blog/:id/delete", isAuthenticated, deleteBlog);

export default router;
