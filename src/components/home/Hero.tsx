"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import hero from "../../../public/hero.jpeg";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null); // Ref on container for better control

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Your existing GSAP logic remains the same
      gsap.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.from(".hero-title", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(".hero-desc", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      });
      gsap.from(".hero-actions", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
        ease: "power3.out",
      });

      gsap.from(imageRef.current, {
        scale: 0.96,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });
      gsap.to(imageRef.current, {
        y: 12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-bg-main to-bg-surface mb-[60px]"
      aria-labelledby="hero-heading" // Accessibility/SEO benefit
    >
      <div className="custom-container min-h-[75vh] grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10">
        {/* LEFT CONTENT */}
        <article>
          {" "}
          {/* Semantic Tag */}
          <div className="hero-badge inline-flex items-center text-xs sm:text-sm mt-3 font-semibold text-primary border-2 border-primary/20 tracking-wider px-5 py-2 bg-gradient-to-r from-primary-soft to-primary/5 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
            <span>Top Rated Career Counselling in India</span>{" "}
            {/* Keyword added */}
          </div>
          <h1
            id="hero-heading"
            className="hero-title mt-6 font-heading font-bold text-heading leading-[1.2] text-3xl md:text-[2.6rem]"
          >
            Vidya Udbhav – Trusted{" "}
            <span className="text-primary">Career Guidance</span> for Confident
            Students
          </h1>
          <p className="hero-desc mt-6 max-w-xl text-text text-base md:text-lg leading-relaxed">
            Confused about your future? Get expert{" "}
            <strong>career counselling after 10th, 12th, and Graduation</strong>
            . In a world of noise, we provide clarity and direction for your
            professional journey.
          </p>
          <div className="hero-actions mt-10 flex flex-col sm:flex-row gap-4">
            <AnimatedButton aria-label="Start Your Career Guidance">
              Start Your Career
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              showArrow={false}
              aria-label="Talk to a Career Mentor"
            >
              Talk to Mentor
            </AnimatedButton>
          </div>
        </article>

        {/* RIGHT IMAGE */}
        <div className="relative hidden lg:block" ref={imageRef}>
          <div className="relative rounded-card shadow-soft overflow-hidden">
            <Image
              src={hero}
              alt="Expert career counselling session for students - Vidya Udbhav" // Descriptive Alt Text
              priority // Loads image faster for LCP (Largest Contentful Paint)
              placeholder="blur"
              className="w-full h-auto object-cover rounded-card"
            />
          </div>
        </div>
      </div>

      {/* Decorative Blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-0 -right-40 w-[32rem] h-[32rem] rounded-full bg-accent/20 blur-3xl animate-pulse" />
    </section>
  );
}
