// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const blogRoutes = require("./routes/blogRoutes");
const githubRoutes = require("./routes/githubRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/github", githubRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server berjalan normal!" });
});

// Start Server terlebih dahulu, lalu connect MongoDB
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di port ${PORT}`);
});

// Connect MongoDB (non-blocking — server tetap jalan meskipun DB gagal)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB terhubung");
  })
  .catch((err) => {
    console.warn("⚠️ MongoDB gagal konek (fitur blog tidak aktif):", err.message);
  });
