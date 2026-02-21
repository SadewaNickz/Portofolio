// frontend/src/pages/Blog.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogService } from "../services/blogServices";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogService
      .getAll()
      .then((res) => setBlogs(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <div className="mb-12 animate-slide-up">
        <h1 className="text-4xl font-bold mb-4">
          Blog <span className="gradient-text">Posts</span>
        </h1>
        <p className="text-gray-400">
          Sharing pengalaman dan ilmu seputar dunia development.
        </p>
      </div>

      <div className="space-y-6">
        {blogs.map((blog) => (
          <Link key={blog._id} to={`/blog/${blog.slug}`}>
            <article className="card hover:translate-y-[-2px] cursor-pointer">
              <div className="flex flex-wrap gap-2 mb-3">
                {blog.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-accent-primary/10 text-accent-primary 
                                             px-2 py-0.5 rounded-full border border-accent-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-xl font-semibold mb-2 hover:text-accent-primary transition-colors">
                {blog.title}
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">
                  {new Date(blog.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-accent-primary text-sm font-medium">
                  Baca selengkapnya →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
