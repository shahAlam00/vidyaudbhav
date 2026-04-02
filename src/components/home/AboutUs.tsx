"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { CheckCircle2, ShieldCheck, Target, Lightbulb } from "lucide-react"; // More icons
import Image from 'next/image';
import our_story from '../../../public/our-story.jpeg';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-line", {
        width: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(".about-reveal", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-content", start: "top 85%" },
      });

      gsap.from(imageRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: { trigger: imageRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden" id="about-vidya-udbhav">
      <div className="custom-container">
        {/* TOP HEADER AREA */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-3 mb-6 text-sm font-bold tracking-widest text-primary uppercase">
            <span className="about-line w-12 h-[2px] bg-primary"></span>
            Who We Are
          </span>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <h2 className="about-reveal lg:text-4xl sm:text-3xl text-2xl font-heading font-bold text-heading max-w-4xl">
              Empowering Students with <span className="text-primary relative italic">Data-Driven Career Guidance
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h2>
            <div className="about-reveal shrink-0 pt-4">
              <AnimatedButton size="md" className="shadow-xl shadow-primary/10">
                Book a Free Consultation
              </AnimatedButton>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT CONTENT */}
          <div className="about-content space-y-10">
            <div className="about-reveal">
              <p className="text-text leading-relaxed text-lg mb-4">
                Founded with a mission to bridge the gap between <strong>ambition and admission</strong>, 
                <span className="text-primary font-bold"> Vidya Udbhav</span> is more than just an education consultancy. 
                We are a team of expert career mentors dedicated to helping students navigate the complex landscape of 
                modern education and <strong>high-growth career paths</strong>.
              </p>
              <p className="text-text leading-relaxed">
                In India, over 90% of students are aware of only seven career options. We are here to change that by 
                providing <strong>unbiased career counselling</strong> and end-to-end admission support.
              </p>
            </div>

            {/* Why We Exist */}
            <div className="about-reveal">
              <h3 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2">
                Our Core Pillars
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                {[
                  { title: "Future-Ready Strategy", desc: "Insight into AI, Tech, and emerging global markets.", icon: Target },
                  { title: "Psychometric Alignment", desc: "Matching personality traits with the right professions.", icon: Lightbulb },
                  { title: "Transparency First", desc: "100% honest advice without hidden college commissions.", icon: ShieldCheck },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-5 rounded-xl border border-border hover:border-primary/30 hover:bg-primary-soft/10 transition-colors group">
                    <item.icon className="text-primary w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-heading">{item.title}</h4>
                      <p className="text-sm text-text">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Promise (Blockquote style for SEO snippets) */}
            <div className="about-reveal bg-bg-main p-8 rounded-2xl border-l-4 border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-accent font-bold text-6xl">“</div>
              <h3 className="text-xl font-bold text-heading mb-4 uppercase tracking-wider">The Vidya Udbhav Promise</h3>
              <div className="space-y-3">
                <p className="text-lg font-medium text-text italic">
                  "We don’t just provide a list of colleges; we architect a career roadmap that leads to success and fulfillment."
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative lg:sticky lg:top-24">
            <div ref={imageRef} className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src={our_story}
                alt="Vidya Udbhav career mentors helping students with college admissions and career path selection"
                className="object-cover w-full h-[600px] hover:scale-105 transition-transform duration-700"
                placeholder="blur"
              />
            </div>
            
            {/* Trust Badge / Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl max-w-[200px] hidden sm:block border border-border">
                <p className="text-primary font-bold text-2xl">100%</p>
                <p className="text-sm font-semibold text-heading">Unbiased Guidance Guaranteed</p>
            </div>

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}