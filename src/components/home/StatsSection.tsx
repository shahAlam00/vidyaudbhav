"use client";

import { GraduationCap, Users, IndianRupee, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  {
    icon: GraduationCap,
    value: 5,
    suffix: "K+",
    label: "Admissions Done",
  },
  {
    icon: Users,
    value: 90,
    suffix: "+",
    label: "Academic Partners",
  },
  {
    icon: IndianRupee,
    value: 20,
    suffix: " LPA+",
    label: "Highest Salary Package",
  },
  {
    icon: Award,
    value: 7,
    suffix: "K+",
    label: "Alumni Network",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative  z-10 mb-[40px]">
      <div className="custom-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item, index) => {
            const count = useCountUp(item.value, 1000, start);

            return (
              <div
                key={index}
                className="
                  flex items-center gap-4
                  bg-bg-surface
                  rounded-card
                  px-6 py-5
                  shadow-soft
                  hover:shadow-lg
                  transition-all duration-300
                "
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                  <item.icon size={22} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-heading font-bold text-heading leading-tight">
                    {count}
                    {item.suffix}
                  </h3>
                  <p className="text-sm text-text">{item.label}</p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
