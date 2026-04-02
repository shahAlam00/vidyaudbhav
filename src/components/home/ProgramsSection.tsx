"use client";

import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Clock,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

/* ================= PROGRAM DATA ================= */
const programs = [
  {
    title: "Online MBA",
    tag: "Popular",
    duration: "2 Years",
    students: "1200+",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "One Year Online MBA",
    duration: "1 Year",
    students: "800+",
    icon: <Clock size={20} />,
  },
  {
    title: "BBA",
    duration: "3 Years",
    students: "1500+",
    icon: <Users size={20} />,
  },
  {
    title: "Online MCA",
    tag: "Hot",
    duration: "2 Years",
    students: "950+",
    icon: <BookOpen size={20} />,
  },
  {
    title: "Online BCA",
    duration: "3 Years",
    students: "1300+",
    icon: <BookOpen size={20} />,
  },
  {
    title: "MA (Master of Arts)",
    duration: "2 Years",
    students: "700+",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "BA (Bachelor of Arts)",
    duration: "3 Years",
    students: "1800+",
    icon: <BookOpen size={20} />,
  },
  {
    title: "M.Tech",
    duration: "2 Years",
    students: "600+",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "B.Tech",
    duration: "4 Years",
    students: "2000+",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "M.Sc",
    duration: "2 Years",
    students: "850+",
    icon: <BookOpen size={20} />,
  },
  {
    title: "B.Sc",
    duration: "3 Years",
    students: "1600+",
    icon: <BookOpen size={20} />,
  },
  {
    title: "M.Com",
    duration: "2 Years",
    students: "750+",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "B.Com",
    duration: "3 Years",
    students: "2200+",
    icon: <BookOpen size={20} />,
  },
  {
    title: "LLM",
    duration: "2 Years",
    students: "400+",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "LLB",
    duration: "3 Years",
    students: "900+",
    icon: <BookOpen size={20} />,
  },
  {
    title: "M.Ed",
    tag: "New",
    duration: "2 Years",
    students: "350+",
    icon: <Users size={20} />,
  },
  {
    title: "B.Ed",
    duration: "2 Years",
    students: "1100+",
    icon: <Users size={20} />,
  },
  {
    title: "MMS",
    duration: "2 Years",
    students: "500+",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "BMS",
    duration: "3 Years",
    students: "1200+",
    icon: <BookOpen size={20} />,
  },
  {
    title: "M.Pharm",
    duration: "2 Years",
    students: "300+",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "B.Pharm",
    duration: "4 Years",
    students: "800+",
    icon: <BookOpen size={20} />,
  },
  {
    title: "M.Phil",
    duration: "1-2 Years",
    students: "200+",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "PGDM",
    tag: "Popular",
    duration: "2 Years",
    students: "1000+",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "ADIS",
    duration: "1 Year",
    students: "450+",
    icon: <Clock size={20} />,
  },
];

/* ================= COMPONENT ================= */
export default function ProgramsSection() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  /* ===== Detect Screen Size ===== */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setVisibleCount(mobile ? 4 : 8);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= UI ================= */
  return (
    <section className="py-20 bg-gradient-to-b from-bg-main to-white mb-[40px]">
      <div className="custom-container">
        {/* ===== Section Heading ===== */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-primary bg-primary-soft rounded-full">
            Our Programs
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-4">
            Explore Our Academic Programs
          </h2>
          <p className="text-text text-lg">
            Choose from a wide range of undergraduate, postgraduate, and online
            programs designed to shape your career and future success.
          </p>
        </div>

        {/* ===== Programs Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.slice(0, visibleCount).map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-bg-surface p-6 rounded-card border border-border hover:shadow-soft transition-all duration-300"
            >
              <div className="flex justify-between mb-4">
                {item.icon}
                {item.tag && (
                  <span className="text-xs px-3 py-1 rounded-full bg-primary-soft text-primary font-semibold">
                    {item.tag}
                  </span>
                )}
              </div>

              <h3 className="font-heading font-bold text-lg mb-3 text-heading">{item.title}</h3>

              <p className="text-sm mb-2 text-text">⏳ {item.duration}</p>
              <p className="text-sm mb-4 text-text">👥 {item.students} Students</p>

              <button className="flex items-center gap-2 text-primary font-semibold text-sm">
                Know More
                <ArrowRight
                  size={16}
                  className={
                    hoveredCard === index ? "translate-x-1 transition" : ""
                  }
                />
              </button>
            </div>
          ))}
        </div>

        {/* ===== Show More / Less ===== */}
        {programs.length > visibleCount && (
          <div className="text-center mt-12">
            <AnimatedButton showArrow={false}>
              Show More Programs
            </AnimatedButton>
          </div>
        )}

        {visibleCount > (isMobile ? 4 : 8) && (
          <div className="text-center mt-4">
            <button
              onClick={() => setVisibleCount(isMobile ? 4 : 8)}
              className="text-primary text-sm font-medium hover:underline"
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
