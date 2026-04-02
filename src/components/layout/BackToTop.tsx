"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top scroll behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <button
        type="button"
        onClick={scrollToTop}
        className={`
          flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg 
          transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-primary/30 
          active:scale-90
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}
        `}
        aria-label="Back to top"
      >
        <ChevronUp size={24} className="animate-bounce-slow" />
      </button>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </div>
  );
}