// frontend/src/pages/BlogDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { blogService } from "../services/blogServices";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogService
      .getBySlug(slug)
      .then((res) => setBlog(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Blog tidak ditemukan.</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
      <Link to="/blog" className="p5-btn px-4 py-2 text-xs mb-8">
        <span className="p5-label">← Kembali ke Blog</span>
      </Link>

      <article className="animate-slide-up">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags?.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="p5-title text-4xl mb-4 leading-tight text-fg">
          {blog.title}
        </h1>

        {/* Date */}
        <p className="text-muted text-sm mb-10">
          {new Date(blog.createdAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Content - render markdown */}
        <div className="markdown max-w-none">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
