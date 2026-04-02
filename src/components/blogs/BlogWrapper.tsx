"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Clock, Eye, TrendingUp, Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getActiveBlogs } from "@/lib/Blogs";
import BlogSkeleton from "./BlogSkeleton";

// --- Interfaces ---
interface Author {
  name: string;
  designation: string;
  initials: string;
  avatar?: string;
}

interface BlogImage {
  url: string;
  alt: string;
}

interface Blog {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  image: BlogImage;
  author: Author;
  views?: number;
  trending?: boolean;
  publishedAt?: string;
}

const BlogWrapper = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredBlog, setHoveredBlog] = useState<string | null>(null);
  
  // Pagination & Filter States
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState(""); // For the input field text
  const [search, setSearch] = useState("");         // For the actual API call
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const limit = 10;

  // --- 1. Debouncing Logic ---
  // This effect listens to inputValue and updates search after 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue);
      setPage(1); // Reset to first page whenever search criteria changes
    }, 500);

    return () => clearTimeout(timer); // Cleanup timer if user types again
  }, [inputValue]);

  // --- 2. Fetching Logic ---
  // This effect only runs when page OR the debounced search changes
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await getActiveBlogs(page, limit, search);
      setBlogs(data.blogs || []);
      setTotalPages(data.pagination.totalPages || 1);
      setTotalBlogs(data.pagination.totalBlogs || 0);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const Skeleton = () => (
  <BlogSkeleton/>
  );

  return (
    <section className="custom-container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Latest Articles</h1>
          <p className="text-sm text-gray-500 mt-1">{totalBlogs} articles found</p>
        </div>

        {/* Search Input with Debounce Control */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by title..."
            value={inputValue}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          {inputValue && (
            <button 
              onClick={() => setInputValue("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <Skeleton />
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed">
          <h3 className="text-xl font-medium text-gray-900">No articles found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="group relative"
                onMouseEnter={() => setHoveredBlog(blog._id)}
                onMouseLeave={() => setHoveredBlog(null)}
              >
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="block border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white hover:border-blue-100 h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.image?.url || "/placeholder.jpg"}
                      alt={blog.image?.alt || blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {blog.trending && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full">
                          <TrendingUp size={12} /> Trending
                        </span>
                      )}
                      <span className="px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="inline-flex items-center gap-1">
                        <Clock size={14} /> {blog.readTime} min read
                      </span>
                      {blog.publishedAt && (
                        <span className="ml-auto">{formatDate(blog.publishedAt)}</span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-sm font-semibold text-blue-600 overflow-hidden">
                        {blog.author?.avatar ? (
                            <Image src={blog.author.avatar} alt={blog.author.name} width={40} height={40} className="object-cover" />
                        ) : blog.author?.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{blog.author?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{blog.author?.designation}</p>
                      </div>
                      <div className={`text-blue-600 transition-all duration-300 ${hoveredBlog === blog._id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}>
                        →
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-lg border font-medium transition-colors ${
                      page === i + 1 ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BlogWrapper;