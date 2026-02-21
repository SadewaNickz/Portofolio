// backend/routes/blogRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
} = require("../controllers/blogController");

router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);
router.post("/", createBlog);
router.put("/:id", updateBlog);

module.exports = router;
