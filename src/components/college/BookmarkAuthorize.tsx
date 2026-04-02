"use client";
import { ArrowRight, Bookmark, Download, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BookmarkAuthorize = ({ setShowBookmarkPopup }: { setShowBookmarkPopup: (value: boolean) => void }) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={() => {
            setShowBookmarkPopup(false)
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="text-primary" size={32} />
          </div>

          <h3 className="text-2xl font-heading font-bold text-heading mb-3">
            Register to Bookmark
          </h3>

          <p className="text-muted text-sm mb-6">
           Sign up to build your dream college list and access member-only content
          </p>

          <button
            onClick={() => router.push("/signup")}
            className="w-full bg-primary hover:bg-heading text-white font-heading font-semibold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Register Now
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => setShowBookmarkPopup(false)}
            className="w-full mt-3 text-muted hover:text-heading font-medium py-2 text-sm transition"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkAuthorize;
