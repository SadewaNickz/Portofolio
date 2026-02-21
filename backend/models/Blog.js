// backend/models/Blog.js
const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Judul blog wajib diisi"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
      required: [true, "Konten blog wajib diisi"],
    },
    excerpt: {
      type: String, // Ringkasan singkat untuk card preview
      maxlength: 200,
    },
    tags: [String],
    // Relasi ke pengalaman (opsional)
    relatedExperience: {
      type: String, // nama perusahaan/pengalaman
      default: null,
    },
    coverImage: String,
    published: {
      type: Boolean,
      default: false, // draft dulu, publish manual
    },
  },
  {
    timestamps: true, // otomatis buat createdAt & updatedAt
  },
);

// Otomatis buat slug dari title sebelum disimpan
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
