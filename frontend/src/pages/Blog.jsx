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
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <div className="mb-12 animate-slide-up">
        <h1 className="p5-title text-4xl mb-4 text-fg">
          Blog <span className="text-accent">Posts</span>
        </h1>
        <p className="text-muted">
          Sharing pengalaman dan ilmu seputar dunia development.
        </p>
        <div className="p5-divider w-24 mt-4" />
      </div>

      <div className="space-y-6">
        {blogs.map((blog) => (
          <Link key={blog._id} to={`/blog/${blog.slug}`}>
            <article className="card p5-card cursor-pointer">
              <div className="p5-content">
                <div className="flex flex-wrap gap-2 mb-3">
                  {blog.tags?.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="p5-heading text-lg mb-2 text-fg">
                  {blog.title}
                </h2>

                <p className="text-muted text-sm leading-relaxed mb-4">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-muted text-xs">
                    {new Date(blog.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-accent text-sm font-semibold">
                    Baca selengkapnya →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
