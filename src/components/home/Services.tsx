"use client";

import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Sparkles } from "lucide-react";
import {
  FiCompass,
  FiBookOpen,
  FiTrendingUp,
  FiUsers,
  FiMonitor,
} from "react-icons/fi";

const services = [
  {
    title: "Scientific Career Assessment",
    description:
      "Unlock your potential with our advanced psychometric tests and personalized career discovery sessions to identify your core strengths.",
    icon: FiCompass,
    keywords: "Career Assessment, Psychometric Test, Strength Finder",
  },
  {
    title: "University & College Selection",
    description:
      "Expert guidance for UG/PG admissions. We help you find the best colleges based on your budget, location, and career goals.",
    icon: FiBookOpen,
    keywords: "College Admissions, UG PG Guidance, University Selection",
  },
  {
    title: "Student Profile Building",
    description:
      "Enhance your CV with strategic certifications, internships, and skill-based projects to stand out in competitive job markets.",
    icon: FiTrendingUp,
    keywords: "Resume Building, Internship Guidance, Skill Development",
  },
  {
    title: "Parent-Student Counselling",
    description:
      "Bridging the gap between student aspirations and parental expectations through transparent and logical clarity sessions.",
    icon: FiUsers,
    keywords: "Career Clarity, Parent Counselling, Educational Roadmap",
  },
  {
    title: "Institutional Career Workshops",
    description:
      "Customized career awareness programs for schools and colleges to foster a growth mindset and goal-oriented planning.",
    icon: FiMonitor,
    keywords: "School Workshops, Seminar for Students, Career Awareness",
  },
];

export default function Services() {
  return (
    <section 
      className="py-16 bg-bg-surface/30" 
      aria-labelledby="services-heading"
      id="services"
    >
      <div className="custom-container">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-16 relative">
          {/* Badge */}
          <span className="inline-block text-sm font-bold text-primary border-2 border-primary/20 tracking-wider px-5 py-2 bg-gradient-to-r from-primary-soft to-primary/5 rounded-full shadow-md mb-4 uppercase">
            <Sparkles className="inline-block w-4 h-4 mr-2" aria-hidden="true" />
            Our Expertise
          </span>

          {/* Heading */}
          <h2 id="services-heading" className="lg:text-4xl sm:text-3xl text-2xl font-heading font-bold mb-4 leading-tight text-heading">
            Tailored <span className="text-primary">Career Solutions</span> for Every Student
          </h2>

          {/* Description */}
          <p className="text-text md:text-lg max-w-3xl mx-auto leading-relaxed">
            From <strong>career path discovery</strong> to <strong>final admission support</strong>, 
            Vidya Udbhav provides the most reliable career counselling services in India to ensure your professional success.
          </p>
        </div>

        {/* ================= SERVICES GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={index}
                className="group p-8 bg-white border-l-4 border-[#1d5ed2] hover:border-transparent hover:bg-[#1d5ed2] cursor-pointer rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-primary-soft group-hover:bg-white/20 mb-6 transition-colors">
                  <Icon className="text-3xl text-primary group-hover:text-white transition-all duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-heading font-bold text-heading group-hover:text-white mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-text text-sm leading-relaxed group-hover:text-white/90 mb-4">
                  {service.description}
                </p>
                
                {/* Hidden Keywords for SEO indexing but clean UI */}
                <span className="sr-only">{service.keywords}</span>
                
                {/* Simple Link/Indicator */}
                <div className="text-primary group-hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  Learn More <span>→</span>
                </div>
              </article>
            );
          })}
        </div>
        
       
      </div>

     
    </section>
  );
}