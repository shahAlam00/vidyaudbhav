"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getActiveCounsellors } from "@/lib/counsellor";
import CounsellorCard from "./CounsellorCard";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Users,
  MapPin,
  Globe,
  Award,
  Clock,
  ChevronDown,
} from "lucide-react";
import CounsellorCardSkeleton from "./CounsellorCardSkeleton";

const CounsellorWrapper = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // State for all filters
  const [filters, setFilters] = useState({
    search: "",
    consultationType: "",
    location: "",
    minExperience: 1,
    maxExperience: 20,
    languages: "",
    professionalExpertise: "",
  });

  const fetchFilteredData = useCallback(async () => {
    setLoading(true);
    try {
      // Clean empty strings so they don't bloat the URL
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== ""),
      );
      const result = await getActiveCounsellors(cleanFilters);
      setCounsellors(result?.data?.counsellors || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }));
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchFilteredData();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchFilteredData]);

  const handleReset = () => {
    setSearchTerm("");
    setFilters({
      search: "",
      consultationType: "",
      location: "",
      minExperience: 1,
      maxExperience: 20,
      languages: "",
      professionalExpertise: "",
    });
    setIsMobileFilterOpen(false);
  };

  const updateFilter = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const FilterSidebar = () => (
    <div className="space-y-4">
      {/* Consultation Type */}
      <div>
        <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
          <Users size={14} className="text-primary" /> Consultation Type
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {["Free", "Paid"].map((type) => (
            <button
              key={type}
              onClick={() =>
                updateFilter(
                  "consultationType",
                  filters.consultationType === type ? "" : type,
                )
              }
              className={`py-2.5 px-4 text-xs font-bold rounded-btn border transition-all ${
                filters.consultationType === type
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-border text-muted hover:border-primary/50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
          <MapPin size={14} className="text-primary" /> Location
        </h4>
        <select
          value={filters.location}
          onChange={(e) => updateFilter("location", e.target.value)}
          className="w-full p-3 rounded-btn border border-border bg-white text-heading focus:border-primary outline-none cursor-pointer text-sm font-medium transition-all"
        >
          <option value="">All Locations</option>
          <option value="Delhi">Delhi NCR</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Pune">Pune</option>
          <option value="Ahmedabad">Ahmedabad</option>
        </select>
      </div>

      {/* Experience Range */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">
            <Clock size={14} className="text-primary" /> Experience
          </h4>
          <span className="text-xs font-bold text-primary bg-primary-soft px-2 py-1 rounded">
            {filters.minExperience}-{filters.maxExperience} Years
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          value={filters.maxExperience}
          onChange={(e) =>
            updateFilter("maxExperience", parseInt(e.target.value))
          }
          className="w-full accent-primary h-2 bg-primary-soft rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Language */}
      <div>
        <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
          <Globe size={14} className="text-primary" /> Language
        </h4>
        <select
          value={filters.languages}
          onChange={(e) => updateFilter("languages", e.target.value)}
          className="w-full p-3 rounded-btn border border-border bg-white text-heading focus:border-primary outline-none cursor-pointer text-sm font-medium transition-all"
        >
          <option value="">Any Language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Bengali">Bengali</option>
          <option value="Tamil">Tamil</option>
          <option value="Telugu">Telugu</option>
          <option value="Marathi">Marathi</option>
          <option value="Gujarati">Gujarati</option>
        </select>
      </div>

      {/* Expertise */}
      <div>
        <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
          <Award size={14} className="text-primary" /> Expertise
        </h4>
        <select
          value={filters.professionalExpertise}
          onChange={(e) =>
            updateFilter("professionalExpertise", e.target.value)
          }
          className="w-full p-3 rounded-btn border border-border bg-white text-heading focus:border-primary outline-none cursor-pointer text-sm font-medium transition-all"
        >
          <option value="">All Expertise</option>
          <option value="Consultant">Consultant</option>
          <option value="Career Coach">Career Coach</option>
          <option value="Admission Expert">Admission Expert</option>
        </select>
      </div>

      <button
        onClick={handleReset}
        className="w-full py-3 text-sm font-bold text-primary hover:bg-[#1d5ed2] hover:text-white rounded-btn transition-all border border-dashed hover:border-solid border-primary/30 mt-4"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="bg-bg-main min-h-screen pb-20 font-body">
      {/* Header Section */}
      <section className="bg-primary pt-14 pb-28 px-4 text-center">
        <div className="custom-container">
          <h1 className="text-white text-3xl md:text-5xl font-heading mb-6 leading-tight">
            Find Your Expert Counsellor
          </h1>
          <div className="max-w-2xl mx-auto relative group">
            <input
              type="text"
              placeholder="Search by name, expertise, or location..."
              value={searchTerm}
              className="w-full py-5 px-14 rounded-card bg-white shadow-2xl focus:ring-4 focus:ring-accent/10 outline-none text-heading transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary"
              size={22}
            />
            {searchTerm && (
              <X
                size={20}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-muted cursor-pointer hover:text-error"
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>
        </div>
      </section>

      <div className="custom-container -mt-14">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[280px] shrink-0">
            <div className="bg-bg-surface p-6 rounded-card shadow-soft sticky top-24 border border-border">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <SlidersHorizontal size={18} className="text-primary" />
                <h3 className="font-heading text-heading">Filters</h3>
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-card border border-border shadow-sm">
              <p className="text-sm font-medium text-muted">
                Results:{" "}
                <span className="text-heading font-bold">
                  {counsellors.length}
                </span>
              </p>
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-btn text-sm font-bold shadow-md"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <CounsellorCardSkeleton key={i}/>
                ))}
              </div>
            ) : counsellors.length === 0 ? (
              <div className="bg-white rounded-card border border-dashed border-border p-20 text-center">
                <Search className="text-muted mx-auto mb-4" size={48} />
                <h3 className="text-xl font-heading text-heading">
                  No counsellors found
                </h3>
                <p className="text-muted text-sm mt-2">
                  Try changing your filters or search term.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {counsellors.map((item: any) => (
                  <CounsellorCard key={item._id} counsellor={item} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative bg-white rounded-t-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[90vh] overflow-y-auto">
            <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-3" />
            <div className="flex justify-between items-center mb-6">
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
              className="w-full mt-6 py-3 bg-primary text-sm font-bold text-white rounded-btn shadow-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounsellorWrapper;
