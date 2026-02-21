// backend/controllers/blogController.js
const Blog = require("../models/Blog");

// GET semua blog yang sudah published
exports.getAllBlogs = async (req, res) => {
  try {
    const { tag, experience } = req.query;

    let filter = { published: true };
    if (tag) filter.tags = tag;
    if (experience) filter.relatedExperience = experience;

    const blogs = await Blog.find(filter)
      .select("-content") // jangan kirim full content di list (berat)
      .sort({ createdAt: -1 });

    res.json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET satu blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      published: true,
    });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog tidak ditemukan" });
    }

    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST buat blog baru (nanti kita amankan dengan auth)
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT update blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return dokumen yang sudah diupdate
      runValidators: true,
    });
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
