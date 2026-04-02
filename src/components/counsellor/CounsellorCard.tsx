"use client";

import Image from "next/image";
import {
  Phone,
  MessageCircle,
  Star,
  ShieldCheck,
  Clock,
  Globe2,
  GraduationCap,
  ArrowRight,
  MapPin,
  Award,
} from "lucide-react";
import Link from "next/link";

type Props = {
  counsellor: any;
};

export default function CounsellorCard({ counsellor }: Props) {
  return (
    <div className="group bg-bg-surface rounded-card border border-border p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 font-body">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[3rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Section */}
        <div className="flex flex-row md:flex-col items-center md:items-start gap-4">
          <Link
            href={`/our-counsellors/${counsellor?._id}`}
            className="relative shrink-0"
          >
            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-card overflow-hidden border border-gray-300 group-hover:ring-primary/30 transition-all duration-300">
              <Image
                src={
                  counsellor.profileImage ||
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
                }
                alt={counsellor.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
           
          </Link>

          {/* Mobile Name */}
          <div className="md:hidden flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-heading font-bold text-heading leading-tight">
                {counsellor.name}
              </h3>
              <ShieldCheck
                size={16}
                className="text-primary fill-primary-soft"
              />
            </div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
              {counsellor.designation}
            </p>
          </div>
        </div>

        {/* Information Section */}
        <div className="flex-1">
          {/* Desktop Name */}
          <div className="hidden md:block mb-4">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-heading font-bold text-heading">
                {counsellor.name}
              </h3>
              <div className="flex items-center gap-1 bg-primary-soft text-primary px-2 py-1 rounded-full">
                <ShieldCheck size={12} />
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Verified
                </span>
              </div>
            </div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              {counsellor.designation}
            </p>
          </div>
          <p className="text-text text-sm leading-relaxed line-clamp-2 mb-5">
            {counsellor.about ||
              "Dedicated counsellor helping students achieve their academic and career goals with personalized guidance and expert advice."}
          </p>
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-btn bg-primary-soft flex items-center justify-center">
                <Clock size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-sm   text-muted tracking-wider">
                  Experience
                </p>
                <p className="text-[14px]  text-heading text-wrap">
                  {counsellor.experience}+ Years
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-btn bg-primary-soft flex items-center justify-center">
                <Globe2 size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-sm   text-muted tracking-wider">
                  Languages
                </p>
                <p className="text-[14px]  text-heading text-wrap">
                  {Array.isArray(counsellor.languages)
                    ? counsellor.languages.slice(0, 4).join(", ")
                    : counsellor.languages || "English"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-btn bg-primary-soft flex items-center justify-center">
                <MapPin size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-sm   text-muted tracking-wider">
                  Location
                </p>
                <p className="text-[14px]  text-heading text-wrap">
                  {counsellor.location || "Remote"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-btn bg-primary-soft flex items-center justify-center">
                <Award size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-sm   text-muted tracking-wider">
                  Expertise
                </p>
                <p className="text-[14px]  text-heading text-wrap">
                  {counsellor.professionalExpertise || "Consulting"}
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="mt-5">
            <Link
              href={`/contact`}
              className="group/btn flex items-center justify-center w-[200px] gap-2  bg-primary hover:bg-heading text-white font-heading font-semibold py-3 rounded-btn text-sm transition-all active:scale-95 shadow-md shadow-primary/20"
            >
              Book Session
              <ArrowRight
                size={14}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
