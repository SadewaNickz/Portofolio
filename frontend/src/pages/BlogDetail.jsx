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
        <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Blog tidak ditemukan.</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
      <Link
        to="/blog"
        className="text-gray-400 hover:text-white text-sm mb-8 inline-block"
      >
        ← Kembali ke Blog
      </Link>

      <article className="animate-slide-up">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
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

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 leading-tight">{blog.title}</h1>

        {/* Date */}
        <p className="text-gray-500 text-sm mb-10">
          {new Date(blog.createdAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Content - render markdown */}
        <div
          className="prose prose-invert prose-lg max-w-none
                        prose-headings:text-white prose-headings:font-bold
                        prose-p:text-gray-300 prose-p:leading-relaxed
                        prose-code:text-accent-primary prose-code:bg-dark-800
                        prose-pre:bg-dark-800 prose-pre:border prose-pre:border-dark-700
                        prose-a:text-accent-primary prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:border-accent-primary prose-blockquote:text-gray-400"
        >
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
