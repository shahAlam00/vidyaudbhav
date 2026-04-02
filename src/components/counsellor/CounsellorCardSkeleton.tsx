"use client";

import React from "react";

export default function CounsellorCardSkeleton() {
  return (
    <div className="relative bg-bg-surface rounded-card border border-border p-6 overflow-hidden font-body shadow-sm">
      {/* Skeleton Shimmer Effect */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* ================= LEFT: Profile Section Skeleton ================= */}
        <div className="flex flex-row md:flex-col items-center md:items-start gap-4">
          {/* Image Skeleton */}
          <div className="relative shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-card bg-slate-200 animate-pulse" />
          
          {/* Mobile Name/Designation Skeleton */}
          <div className="md:hidden flex-1 space-y-2">
            <div className="h-5 w-32 bg-slate-200 animate-pulse rounded-md" />
            <div className="h-3 w-24 bg-slate-100 animate-pulse rounded-md" />
          </div>
        </div>

        {/* ================= MIDDLE: Information Section Skeleton ================= */}
        <div className="flex-1">
          {/* Desktop Name Skeleton */}
          <div className="hidden md:block mb-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-48 bg-slate-200 animate-pulse rounded-lg" />
              <div className="h-5 w-16 bg-slate-100 animate-pulse rounded-full" />
            </div>
            <div className="h-4 w-32 bg-slate-100 animate-pulse rounded-md" />
          </div>

          {/* About Text Skeleton */}
          <div className="space-y-2 mb-5">
            <div className="h-4 w-full bg-slate-100 animate-pulse rounded-md" />
            <div className="h-4 w-[85%] bg-slate-100 animate-pulse rounded-md" />
          </div>

          {/* Stats Grid Skeleton */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                {/* Icon Circle */}
                <div className="w-8 h-8 rounded-btn bg-slate-100 animate-pulse shrink-0" />
                {/* Text Lines */}
                <div className="space-y-1 flex-1">
                  <div className="h-2 w-12 bg-slate-50 animate-pulse rounded" />
                  <div className="h-3 w-20 bg-slate-100 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button Skeleton */}
          <div className="mt-6">
            <div className="h-12 w-[200px] bg-slate-200 animate-pulse rounded-btn" />
          </div>
        </div>
      </div>
    </div>
  );
}