"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaShareAlt,
  FaTimes,
} from "react-icons/fa";
import BackButton from "../ui/BackButton";

interface BlogDetailsWrapperProps {
  blog: any;
}

const BlogDetailsWrapper = ({ blog }: BlogDetailsWrapperProps) => {
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  if (!blog) {
    return (
      <div className="py-20 text-center text-gray-500">Blog not found</div>
    );
  }

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://www.vidyaudbhav.com/blogs/${blog.slug}`;

  const shareTitle = blog.title;
  const shareDescription = blog.excerpt || "Read this amazing article";

  /** Close on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShowShare(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cleanContent = (html: string) => {
    return html
      .replace(/background-color:[^;]+;?/g, '') // Removes background-color
      .replace(/background:[^;]+;?/g, '');      // Removes shorthand background
  };

  return (
    <div className="custom-container">
      <div className="py-10">
        <BackButton />
      </div>
      <article className="max-w-4xl  pb-10">
        {/* Category */}
        <span className="text-sm font-semibold text-primary">
          {blog.category} / {blog.subCategory}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
          {blog.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          <span>{blog.author?.name}</span>
          <span>•</span>
          <span>{blog.readTime} min read</span>
          <span>•</span>
          <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{blog.views} views</span>
        </div>

        {/* Image */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={blog.image?.url}
            alt={blog.image?.alt}
            className="w-full object-cover"
          />
        </div>

        {/* Excerpt */}
        <p className="text-lg text-gray-700 mb-8 italic">{blog.excerpt}</p>

        {/* Content */}
     <div className="bg-[#f8fafc]"> {/* Your desired background */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: cleanContent(blog.content) }}
      />
    </div>

        {/* TAGS + SHARE */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t pt-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {blog.tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* SHARE SECTION */}
          <div ref={shareRef} className="relative">
            {/* SHARE BUTTON */}
            {!showShare && (
              <button
                onClick={() => setShowShare(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full
              bg-primary text-white
              shadow-md 
              transition-all duration-300"
              >
                <FaShareAlt />
                <span className="text-sm font-medium">Share this article</span>
              </button>
            )}

            {/* SOCIAL ICONS */}
            {showShare && (
              <div
                className="flex items-center gap-3 p-2 rounded-full
              bg-white border shadow-lg
              animate-[fadeSlideIn_0.35s_ease-out]"
              >
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    shareTitle + " - " + shareUrl,
                  )}`}
                  target="_blank"
                  className="h-9 w-9 rounded-full bg-green-500 text-white
                flex items-center justify-center
                hover:scale-110 hover:shadow-md transition"
                >
                  <FaWhatsapp size={14} />
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl,
                  )}`}
                  target="_blank"
                  className="h-9 w-9 rounded-full bg-blue-600 text-white
                flex items-center justify-center
                hover:scale-110 hover:shadow-md transition"
                >
                  <FaFacebookF size={16} />
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    shareTitle,
                  )}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  className="h-9 w-9 rounded-full bg-black text-white
                flex items-center justify-center
                hover:scale-110 hover:shadow-md transition"
                >
                  <FaTwitter size={14} />
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    shareUrl,
                  )}`}
                  target="_blank"
                  className="h-9 w-9 rounded-full bg-blue-700 text-white
                flex items-center justify-center
                hover:scale-110 hover:shadow-md transition"
                >
                  <FaLinkedinIn size={14} />
                </a>

                {/* Close */}
                <button
                  onClick={() => setShowShare(false)}
                  className="h-9 w-9 rounded-full bg-gray-100 text-gray-600
                flex items-center justify-center
                hover:bg-gray-200 hover:scale-105 transition"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailsWrapper;
