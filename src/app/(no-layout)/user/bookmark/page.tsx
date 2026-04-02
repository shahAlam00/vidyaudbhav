"use client";

import { isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getBookmarks, removeBookmark } from "@/lib/Bookmarks";
import { toast } from "react-toastify";
import {
  Bookmark,
  MapPin,
  GraduationCap,
  BookOpen,
  ChevronRight,
  Trash2,
} from "lucide-react";
import Link from "next/link";

const BookmarkPage = () => {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const response = await getBookmarks();
      setBookmarks(response.bookmarks || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch bookmarks");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (
    bookmarkId: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setRemovingId(bookmarkId);
    try {
      await removeBookmark(bookmarkId);
      setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
      fetchBookmarks();
      toast.success("Removed from bookmarks");
    } catch (error: any) {
      toast.error(error.message || "Failed to remove bookmark");
    } finally {
      setRemovingId(null);
    }
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-card border border-border overflow-hidden flex flex-col h-[480px] animate-pulse">
      <div className="h-48 bg-slate-200" />
      <div className="p-5 flex-1">
        <div className="h-3 w-24 bg-slate-200 rounded mb-4" />
        <div className="h-6 w-full bg-slate-200 rounded mb-2" />
        <div className="h-3 w-32 bg-slate-200 rounded mb-6" />
        <div className="space-y-2 mb-6">
          <div className="h-2 w-20 bg-slate-100 rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-14 bg-slate-200 rounded" />
            <div className="h-6 w-14 bg-slate-200 rounded" />
            <div className="h-6 w-14 bg-slate-200 rounded" />
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-border flex justify-between">
          <div className="space-y-1">
            <div className="h-2 w-10 bg-slate-100 rounded" />
            <div className="h-5 w-16 bg-slate-200 rounded" />
          </div>
          <div className="h-10 w-24 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated()) return null;

  return (
    <div className="bg-bg-main min-h-screen pb-20">
      <section className="bg-primary pt-14 pb-28 px-4 text-center">
        <div className="custom-container">
          <h1 className="text-white text-3xl md:text-5xl font-heading mb-6 leading-tight">
            My Bookmarked Colleges
          </h1>
          <p className="text-white/80 text-lg">
            Colleges you've saved for later
          </p>
        </div>
      </section>

      <div className="custom-container -mt-14">
        <main className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="bg-white py-20 text-center rounded-card border border-dashed border-border">
              <Bookmark className="text-muted mx-auto mb-4" size={48} />
              <h3 className="text-xl font-heading text-heading">
                No bookmarks yet
              </h3>
              <p className="text-muted text-sm mt-2">
                Start exploring colleges and save your favorites
              </p>
              <Link href="/colleges">
                <button className="mt-6 bg-primary text-white px-6 py-3 rounded-btn font-semibold hover:bg-heading transition">
                  Browse Colleges
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {bookmarks.map((bookmark) => {
                const college = bookmark.college;
                if (!college) return null;

                return (
                  <div
                    key={bookmark._id}
                    className="bg-white rounded-card shadow-soft overflow-hidden border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-[480px]"
                  >
                    <div className="relative h-48 shrink-0 overflow-hidden">
                      <img
                        src={college.coverImage}
                        alt={college.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <Link href={`/colleges/${college.slug}`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
                      </Link>

                      <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <div className="bg-white p-1.5 rounded-lg shadow-lg">
                          <img
                            src={college.logo}
                            className="h-9 w-9 object-contain"
                            alt="logo"
                          />
                        </div>
                        <div className="drop-shadow-md">
                          <h4 className="text-white font-bold text-sm leading-tight">
                            {college.shortName}
                          </h4>
                          <p className="text-white/80 text-[10px] uppercase tracking-widest font-medium">
                            {college.location?.city}
                          </p>
                        </div>
                      </div>

                      {college.isFeatured && (
                        <span className="absolute top-4 right-4 bg-accent text-white text-[9px] px-3 py-1 rounded-full font-black shadow-lg">
                          FEATURED
                        </span>
                      )}

                      <button
                        onClick={(e) =>
                          handleRemoveBookmark(bookmark.college._id, e)
                        }
                        disabled={removingId === bookmark._id}
                        className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 transition-all disabled:opacity-50"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-wider mb-2.5">
                        <GraduationCap size={14} strokeWidth={2.5} />
                        <span>{college.collegeType}</span>
                        <span className="text-border">•</span>
                        <span>EST {college.establishedYear}</span>
                      </div>

                      <h2 className="text-lg font-heading text-heading mb-1.5 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {college.name}
                      </h2>

                      <div className="flex items-center gap-1.5 text-muted text-xs mb-5">
                        <MapPin size={13} className="text-primary/70" />
                        <span className="font-medium">
                          {college.location?.city}, {college.location?.state}
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted/60 uppercase tracking-[0.1em] mb-2.5">
                          <BookOpen size={12} className="text-primary" />
                          Popular Courses
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {college.courses
                            ?.slice(0, 3)
                            .map((course: any, idx: number) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 bg-primary-soft/30 text-primary text-[10px] font-bold rounded-md border border-primary/10 group-hover:bg-primary-soft group-hover:border-primary/20 transition-colors"
                              >
                                {course.name}
                              </span>
                            ))}
                          {college.courses?.length > 3 && (
                            <span className="px-2 py-1 bg-bg-main text-muted text-[10px] font-bold rounded-md border border-border">
                              +{college.courses.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-border/60 flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-muted font-bold uppercase tracking-tighter">
                            Avg Fees
                          </span>
                          <span className="text-heading font-black text-xl leading-none">
                            ₹{college.feesRange?.min?.toLocaleString()}
                          </span>
                        </div>

                        <Link href={`/colleges/${college.slug}`}>
                          <button className="bg-primary text-white px-6 py-2.5 rounded-btn font-semibold text-sm hover:bg-heading hover:-translate-y-0.5 transition-all shadow-md active:scale-95 flex items-center gap-2">
                            Explore <ChevronRight size={14} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BookmarkPage;
