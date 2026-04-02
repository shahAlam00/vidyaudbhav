"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  GraduationCap,
  BookOpenCheck,
  Building2,
  BookOpen,
} from "lucide-react";
import { getActiveColleges } from "@/lib/colleges";
import { getBookmarks, addBookmark, removeBookmark } from "@/lib/Bookmarks";
import { isAuthenticated } from "@/lib/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import { MdOutlineBookmark, MdBookmark } from "react-icons/md"; // Added MdBookmark for solid icon
import BookmarkAuthorize from "@/components/college/BookmarkAuthorize";

// --- Interfaces ---
interface Course {
  name: string;
  specialization: string;
}

interface College {
  _id: string;
  name: string;
  slug: string;
  shortName: string;
  logo: string;
  coverImage: string;
  collegeType: string;
  establishedYear: number;
  location: { city: string; state: string };
  feesRange: { min: number; max: number };
  courses: Course[];
  isFeatured: boolean;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalColleges: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const POPULAR_COURSES = [
  "B.Tech",
  "M.Tech",
  "BCA",
  "MCA",
  "MBA",
  "BBA",
  "B.Sc",
  "M.Sc",
];
const INSTITUTION_TYPES = ["Private", "Autonomous", "Deemed", "Government"];

const CollegeListing: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set()); // Optimized state for IDs
  const [bookmarkLoading, setBookmarkLoading] = useState<string | null>(null);
  const [showBookmarkPopup, setShowBookmarkPopup] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    search: "",
    type: "",
    course: "",
  });

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const response = await getActiveColleges(filters);
      if (response.success) {
        setColleges(response.colleges);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    if (!isAuthenticated()) return;
    try {
      const response = await getBookmarks();
      // Extracting only college IDs for faster lookup
      const ids = new Set(
        response.bookmarks?.map((b: any) => b?.college?._id).filter(Boolean),
      );
      setBookmarkedIds(ids as Set<string>);
    } catch (error) {
      console.error("Fetch Bookmarks Error:", error);
    }
  };

  const handleBookmark = async (college: College, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated()) {
      setShowBookmarkPopup(true);
      return;
    }

    const collegeId = college._id;
    const isCurrentlyBookmarked = bookmarkedIds.has(collegeId);

    // 1. Optimistic Update: UI को तुरंत बदलो
    setBookmarkedIds((prev) => {
      const newSet = new Set(prev);
      if (isCurrentlyBookmarked) newSet.delete(collegeId);
      else newSet.add(collegeId);
      return newSet;
    });

    setBookmarkLoading(collegeId);

    try {
      if (isCurrentlyBookmarked) {
        await removeBookmark(collegeId);
        toast.success("Removed from bookmarks");
      } else {
        await addBookmark({ collegeId });
        toast.success("Added to bookmarks");
      }
    } catch (error: any) {
      // 2. Rollback: अगर API फेल हो जाए तो वापस पुराने स्टेट पर जाओ
      setBookmarkedIds((prev) => {
        const newSet = new Set(prev);
        if (isCurrentlyBookmarked) newSet.add(collegeId);
        else newSet.delete(collegeId);
        return newSet;
      });
      toast.error(error.message || "Failed to update bookmark");
    } finally {
      setBookmarkLoading(null);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm, page: 1 }));
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    fetchColleges();
    fetchBookmarks();
  }, [filters.page, filters.search, filters.type, filters.course]);

  const updateFilter = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({ page: 1, limit: 12, search: "", type: "", course: "" });
    setIsMobileFilterOpen(false);
  };

  // --- Sub-Components ---
  const SkeletonCard = () => (
    <div className="bg-white rounded-card border border-border overflow-hidden flex flex-col h-[480px] animate-pulse">
      <div className="h-48 bg-slate-200" />
      <div className="p-5 flex-1">
        <div className="h-3 w-24 bg-slate-200 rounded mb-4" />
        <div className="h-6 w-full bg-slate-200 rounded mb-2" />
        <div className="h-3 w-32 bg-slate-200 rounded mb-6" />
        <div className="space-y-2 mb-6">
          <div className="h-6 w-full bg-slate-100" />
        </div>
        <div className="mt-auto pt-4 border-t border-border flex justify-between">
          <div className="h-10 w-24 bg-slate-200 rounded" />
          <div className="h-10 w-24 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );

  const FilterSidebar = () => (
    <div className="space-y-3">
      <div>
        <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
          <BookOpenCheck size={14} className="text-primary" /> Select Course
        </h4>
        <select
          value={filters.course}
          onChange={(e) => updateFilter("course", e.target.value)}
          className="w-full p-3 rounded-btn border border-border bg-white text-heading focus:border-primary outline-none text-sm font-medium"
        >
          <option value="">All Courses</option>
          {POPULAR_COURSES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
          <Building2 size={14} className="text-primary" /> Institution Type
        </h4>
        <select
          value={filters.type}
          onChange={(e) => updateFilter("type", e.target.value)}
          className="w-full p-3 rounded-btn border border-border bg-white text-heading focus:border-primary outline-none text-sm font-medium"
        >
          <option value="">All Types</option>
          {INSTITUTION_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={resetFilters}
        className="w-full py-3 text-sm font-bold text-primary hover:bg-[#1D5ED2] hover:text-white rounded-btn transition-all border border-dashed hover:border-dotted border-primary/30 mt-4"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="bg-bg-main min-h-screen pb-20">
      {showBookmarkPopup && (
        <BookmarkAuthorize setShowBookmarkPopup={setShowBookmarkPopup} />
      )}

      <section className="bg-primary pt-14 pb-28 px-4 text-center">
        <div className="custom-container">
          <h1 className="text-white text-3xl md:text-5xl font-heading mb-6 leading-tight">
            Find Your Future College
          </h1>
          <div className="max-w-2xl mx-auto relative group">
            <input
              type="text"
              placeholder="Search by college name, city or course..."
              value={searchTerm}
              className="w-full py-5 px-14 rounded-card bg-white shadow-2xl outline-none text-heading"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-muted"
              size={22}
            />
            {searchTerm && (
              <X
                size={20}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-muted cursor-pointer"
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>
        </div>
      </section>

      <div className="custom-container -mt-14">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-[280px] shrink-0">
            <div className="bg-bg-surface p-6 rounded-card shadow-soft sticky top-24 border border-border">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <SlidersHorizontal size={18} className="text-primary" />
                <h3 className="font-heading text-heading">Filters</h3>
              </div>
              <FilterSidebar />
            </div>
          </aside>

          <main className="flex-1">
            <div className="lg:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-card border border-border shadow-sm">
              <p className="text-sm font-medium text-muted">
                Results:{" "}
                <span className="text-heading font-bold">
                  {pagination?.totalColleges || 0}
                </span>
              </p>
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-btn text-sm font-bold"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {colleges.map((college) => {
                    const isFav = bookmarkedIds.has(college._id);
                    return (
                      <div
                        key={college._id}
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
                                {college.location.city}
                              </p>
                            </div>
                          </div>

                          {college.isFeatured && (
                            <span className="absolute top-4 right-4 bg-accent text-white text-[9px] px-3 py-1 rounded-full font-black shadow-lg">
                              FEATURED
                            </span>
                          )}

                          <button
                            onClick={(e) => handleBookmark(college, e)}
                            disabled={bookmarkLoading === college._id}
                            className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-50 z-10"
                          >
                            {isFav ? (
                              <MdBookmark
                                size={20}
                                className="text-primary fill-primary"
                              />
                            ) : (
                              <MdOutlineBookmark
                                size={20}
                                className="text-gray-600"
                              />
                            )}
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
                              {college.location.city}, {college.location.state}
                            </span>
                          </div>
                          <div className="mb-4">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted/60 uppercase mb-2.5">
                              <BookOpen size={12} className="text-primary" />{" "}
                              Popular Courses
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {college.courses
                                ?.slice(0, 3)
                                .map((course, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2.5 py-1 bg-primary-soft/30 text-primary text-[10px] font-bold rounded-md border border-primary/10"
                                  >
                                    {course.name}
                                  </span>
                                ))}
                            </div>
                          </div>
                          <div className="mt-auto pt-4 border-t border-border/60 flex justify-between items-center">
                            {/* <div className="flex flex-col">
                              <span className="text-[10px] text-muted font-bold uppercase">
                                Avg Fees
                              </span>
                              <span className="text-heading font-black text-xl">
                                ₹{college.feesRange.min.toLocaleString()}
                              </span>
                            </div> */}
                            <Link href={`/colleges/${college.slug}`}>
                              <button className="bg-primary text-white px-6 py-2.5 rounded-btn font-semibold text-sm hover:bg-heading transition-all shadow-md flex items-center gap-2">
                                Explore <ChevronRight size={14} />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {colleges.length === 0 && (
                  <div className="bg-white py-20 text-center rounded-card border border-dashed border-border">
                    <Search className="text-muted mx-auto mb-4" size={48} />
                    <h3 className="text-xl font-heading text-heading">
                      No colleges found
                    </h3>
                    <button
                      onClick={resetFilters}
                      className="mt-6 text-primary font-bold hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}

                {pagination && pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12">
                    <button
                      disabled={!pagination.hasPrev}
                      onClick={() => updateFilter("page", filters.page - 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-btn border border-border bg-white hover:bg-primary hover:text-white disabled:opacity-20 transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className="bg-white border border-border px-6 py-3 rounded-btn font-bold text-heading">
                      {pagination.currentPage} / {pagination.totalPages}
                    </div>
                    <button
                      disabled={!pagination.hasNext}
                      onClick={() => updateFilter("page", filters.page + 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-btn border border-border bg-white hover:bg-primary hover:text-white disabled:opacity-20 transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative bg-white rounded-t-[2.5rem] p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-2xl font-heading text-heading">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 bg-bg-main rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <FilterSidebar />
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full mt-5 py-3 bg-primary text-sm font-bold text-white rounded-btn shadow-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeListing;
