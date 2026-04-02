"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import "swiper/css";
import { getActiveCounsellors } from "@/lib/counsellor";

// --- Types ---
interface Counsellor {
  _id: string;
  name: string;
  designation: string;
  profileImage: string;
  professionalExpertise: string;
}

// --- Skeleton Component ---
const CardSkeleton = () => (
  <div className="group relative rounded-[var(--radius-card)] bg-gray-100 overflow-hidden animate-pulse">
    <div className="h-[320px] w-full bg-gray-200" />
    <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/80 backdrop-blur-sm px-4 py-4 flex flex-col items-center">
      <div className="h-4 w-32 bg-gray-300 rounded mb-2" />
      <div className="h-3 w-24 bg-gray-200 rounded mb-4" />
      <div className="h-8 w-24 bg-gray-300 rounded-full" />
    </div>
  </div>
);

export default function ExpertTeamCarousel() {
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching with a limit of 7 as requested
        const response = await getActiveCounsellors({ limit: 7 });
        if (response.success) {
          setCounsellors(response.data.counsellors);
        }
      } catch (error) {
        console.error("Failed to load experts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="mb-[40px] py-10">
      <div className="custom-container">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-primary font-bold text-sm uppercase tracking-widest mb-3 block">
              Our Mentors
            </span>
            <h2 className="lg:text-4xl sm:text-3xl text-2xl font-heading font-bold leading-tight">
              Meet the Experts Guiding Your{" "}
              <span className="text-primary">Future</span>
            </h2>
          </div>
          <div className="hidden md:block">
            <AnimatedButton variant="outline">View Full Team</AnimatedButton>
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {loading
            ? // Show 4 skeletons while loading
              Array.from({ length: 4 }).map((_, i) => (
                <SwiperSlide key={i} >
                  <CardSkeleton />
                </SwiperSlide>
              ))
            : counsellors.map((expert) => (
                <SwiperSlide key={expert._id}>
                  <div className="group relative rounded-[var(--radius-card)]  overflow-hidden  hover:shadow-xl transition-shadow duration-300">
                    {/* Image */}
                    <div className="relative h-[320px] w-full bg-[#f2f2f2] overflow-hidden">
                      <img
                        src={expert.profileImage}
                        alt={expert.name}
                        className="object-cover transition-transform duration-500 w-full h-full ease-in-out cursor-pointer group-hover:scale-110"
                      />
                    </div>

                    {/* Info Card */}
                    <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 backdrop-blur-sm px-4 py-4 shadow-lg flex flex-col items-center border border-gray-100">
                      <h3 className="text-[var(--color-accent)] font-heading font-semibold text-base line-clamp-1">
                        {expert.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-1">
                        {expert.designation}
                      </p>

                      <div>
                        <AnimatedButton size="sm">Consult Now</AnimatedButton>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
}