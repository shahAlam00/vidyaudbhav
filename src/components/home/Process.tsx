"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Sparkles } from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Personal Profile Discovery", // SEO Keyword: Discovery
    description: "We start by deep-diving into your academic history, personality traits, and long-term career aspirations to build a solid foundation.",
  },
  {
    step: "02",
    title: "Scientific Aptitude Assessment", // SEO Keyword: Aptitude Assessment
    description: "Using globally recognized psychometric tools, we analyze your strengths and interests to provide data-backed career insights.",
  },
  {
    step: "03",
    title: "Strategic Career Roadmap", // SEO Keyword: Career Roadmap
    description: "Our mentors design a personalized path, suggesting the right courses and top-tier colleges that fit your goals and budget.",
  },
  {
    step: "04",
    title: "Application & Admission Support", // SEO Keyword: Admission Support
    description: "Complete handholding through entrance exams, complex application forms, and documentation to ensure a smooth transition.",
  },
  {
    step: "05",
    title: "Final Career Onboarding", 
    description: "End-to-end guidance continues until you successfully secure your seat in your dream university.",
  },
];

export default function Process() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="py-24 bg-slate-50 relative overflow-hidden"
      id="counselling-process"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="custom-container relative">
        {/* ================= HEADER ================= */}
        <header className="text-center mb-24 max-w-3xl mx-auto">
          <span className="hero-badge inline-flex items-center text-sm font-bold text-primary border-2 border-primary/20 tracking-wider px-5 py-2 bg-white rounded-full shadow-sm mb-6 uppercase">
            <Sparkles className="w-4 h-4 mr-2" />
            Our Proven Framework
          </span>
          <h2 className="lg:text-4xl sm:text-3xl text-2xl font-heading font-bold mb-4 text-slate-900">
            5 Simple Steps to Your <span className="text-primary italic">Dream Career</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Vidya Udbhav follows a <strong>scientifically validated career guidance process</strong> to eliminate confusion and maximize your potential.
          </p>
        </header>

        {/* ================= TIMELINE ================= */}
        <div className="relative max-w-5xl mx-auto px-4">
          {/* Central Progress Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 -translate-x-1/2">
            <motion.div
              style={{ scaleY }}
              className="w-full h-full bg-primary origin-top shadow-[0_0_15px_rgba(var(--primary),0.3)]"
            />
          </div>

          <div className="sm:space-y-16 space-y-10">
            {processSteps.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center justify-between w-full ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-[45%] ml-10 md:ml-0">
                    <div className="group relative p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                      <div className="relative z-10">
                        <span className="text-primary font-bold text-sm tracking-widest block mb-2 uppercase">
                          Phase {item.step}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Central Dot */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white border-4 border-primary shadow-xl flex items-center justify-center z-20">
                      <span className="text-xs font-black text-primary">{item.step}</span>
                    </div>
                    <div className="absolute w-12 h-12 bg-primary/10 rounded-full animate-pulse" />
                  </div>

                  <div className="hidden md:block w-[45%]" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>

     
    </section>
  );
}