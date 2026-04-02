"use client";

import React, { useState } from "react";
import {
  MapPin,
  Globe,
  Calendar,
  Award,
  BookOpen,
  CheckCircle2,
  Phone,
  Mail,
  Download,
  Star,
  Briefcase,
  Home,
  Wifi,
  Bus,
  Dumbbell,
  Utensils,
  Stethoscope,
  Activity,
  ArrowRight,
  TrendingUp,
  Building,
  Image as ImageIcon,
  ShieldCheck,
  X,
} from "lucide-react";
import { getAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

const FACILITY_CONFIG: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  hostel: { label: "Hostel", icon: <Home size={16} /> },
  library: { label: "Library", icon: <BookOpen size={16} /> },
  sports: { label: "Sports", icon: <Activity size={16} /> },
  wifi: { label: "Wi-Fi", icon: <Wifi size={16} /> },
  transport: { label: "Transport", icon: <Bus size={16} /> },
  gym: { label: "Gym", icon: <Dumbbell size={16} /> },
  cafeteria: { label: "Cafeteria", icon: <Utensils size={16} /> },
  medical: { label: "Medical", icon: <Stethoscope size={16} /> },
};

const CollegeDetailsWrapper = ({ college }: { college: any }) => {
  if (!college) return null;
  const auth = getAuth();
  const isAuthenticated = auth?.token;
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleBrochureClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowPopup(true);
    }
  };

  return (
    <div className="bg-bg-main min-h-screen pb-20 font-body">
      {/* ================= HERO ================= */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60  z-10" />

        <img
          src={college.coverImage}
          alt={college.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        />

        {college.brochure?.fileUrl && (
          <div className="fixed top-1/2 -translate-y-1/2 rotate-90 -right-18  !z-[400]">
            <a
              href={isAuthenticated ? college.brochure.fileUrl : "#"}
              target={isAuthenticated ? "_blank" : "_self"}
              onClick={handleBrochureClick}
              className="bg-accent  hover:bg-accent-hover text-white px-6 py-2 rounded-btn font-heading font-semibold flex items-center gap-2 shadow-xl transition-all"
            >
              <Download size={18} />
              Brochure 2026
            </a>
          </div>
        )}

        <div className="relative z-20 custom-container h-full flex flex-col justify-end pb-8 md:pb-12">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
            <div className="bg-white p-3 rounded-card shadow-xl border border-border">
              <img
                src={college.logo}
                alt="logo"
                className="h-20 w-20 md:h-24 md:w-24 object-contain"
              />
            </div>

            <div className="text-white flex-1">
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-3">
                <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {college.collegeType}
                </span>

                {college.isFeatured && (
                  <span className="flex items-center gap-1 text-xs font-bold text-white bg-black/40 px-3 py-1 rounded-md backdrop-blur border border-white/10">
                    <Star size={14} fill="currentColor" />
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-5xl text-white font-black mb-4 drop-shadow">
                {college.name}
              </h1>

              <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start text-xs md:text-sm text-white/90">
                {college.location?.city && (
                  <span className="flex items-center gap-2">
                    <MapPin size={16} className="text-accent" />
                    {college.location.city}
                  </span>
                )}
                {college.campusSize && (
                  <span className="flex items-center gap-2">
                    <Building size={16} className="text-accent" />
                    {college.campusSize} Acres
                  </span>
                )}
                {college.website && (
                  <span className="flex items-center gap-2">
                    <Globe size={16} className="text-accent" />
                    {college.website.replace(/^https?:\/\//, "")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="custom-container mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            {college.overview?.description && (
              <section className="bg-bg-surface p-6 md:p-8 rounded-card shadow-soft border border-border">
                <h2 className="text-2xl font-heading  mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-primary rounded-full" />
                  Overview
                </h2>

                <p className="text-text text-base md:text-lg leading-relaxed mb-8">
                  {college.overview.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {college.overview.highlights?.length > 0 && (
                    <div className="bg-primary-soft p-6 rounded-card border border-primary/10">
                      <h4 className="font-heading font-bold text-primary mb-4 flex items-center gap-2 uppercase text-[11px] tracking-widest">
                        <CheckCircle2 size={18} />
                        Major Highlights
                      </h4>

                      <ul className="space-y-3">
                        {college.overview.highlights.map(
                          (item: string, i: number) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-text"
                            >
                              <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary" />
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {college.overview.whyChoose?.length > 0 && (
                    <div className="bg-bg-main p-6 rounded-card border border-border">
                      <h4 className="font-heading font-bold mb-4 flex items-center gap-2 uppercase text-[11px] tracking-widest">
                        <TrendingUp size={18} className="text-accent" />
                        Why Choose {college.shortName}
                      </h4>

                      <ul className="space-y-3">
                        {college.overview.whyChoose.map(
                          (item: string, i: number) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm font-semibold"
                            >
                              <ArrowRight size={14} className="text-accent mt-1" />
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Gallery */}
            {college.gallery?.length > 0 && (
              <section className="bg-bg-surface p-6 md:p-8 rounded-card shadow-soft border border-border">
                <h2 className="text-2xl font-heading  mb-6 flex items-center gap-3">
                  <ImageIcon className="text-primary" />
                  Campus Gallery
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {college.gallery.map((img: any, i: number) => (
                    <div
                      key={i}
                      className="relative aspect-video rounded-card overflow-hidden border border-border group"
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.category || "Gallery"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">
                          {img.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Courses */}
            {college.courses?.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-2xl font-heading font-bold">
                  Academic Programs
                </h3>

                {college.courses.map((course: any) => (
                  <div
                    key={course._id}
                    className="bg-bg-surface p-6 rounded-card border border-border hover:border-primary transition-all flex flex-col md:flex-row gap-4"
                  >
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl  ">{course.name}</h4>
                      <p className="text-primary font-bold text-sm mb-2">
                        {course.specialization}
                      </p>

                      <div className="flex flex-wrap gap-4 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {course.duration}
                        </span>
                        <span className="font-semibold text-xs">
                          Eligibility: {course.eligibility}
                        </span>
                      </div>
                    </div>

                    {/* <div className="bg-bg-main p-4 rounded-card border border-border min-w-[160px]">
                      <p className="text-[10px] text-muted uppercase font-black">
                        Annual Fee
                      </p>
                      <p className="text-xl md:text-2xl font-black text-heading">
                        ₹{course.feesPerYear?.toLocaleString()}
                      </p>
                    </div> */}
                  </div>
                ))}
              </section>
            )}

            {/* Placements */}
            {college.placements?.length > 0 && (
              <section className="bg-bg-surface p-6 md:p-8 rounded-card shadow-soft border border-border">
                <h2 className="text-2xl font-heading  mb-8 flex items-center gap-3">
                  <Briefcase className="text-primary" />
                  Placements
                </h2>

                {college.placements.map((p: any) => (
                  <div key={p._id} className="mb-10">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">
                        Report {p.year}
                      </span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        ["Highest", p.highestPackage, "text-success"],
                        ["Average", p.averagePackage, "text-primary"],
                        ["Placed", `${p.placementPercentage}%`, "text-accent"],
                        ["Median", p.medianPackage, "text-heading"],
                      ].map(([label, value, color], i) => (
                        <div
                          key={i}
                          className="bg-bg-main p-4 rounded-card border border-border text-center"
                        >
                          <p className="text-[9px] uppercase font-black text-muted">
                            {label}
                          </p>
                          <p className={`text-lg font-black ${color}`}>
                            {value} LPA
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4 space-y-6">
            {/* Rankings */}
            {(college.rankings?.nirf || college.rankings?.naacGrade) && (
              <div className="bg-heading p-6 md:p-8 rounded-card shadow-xl relative overflow-hidden text-white">
                <Award className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5" />
                <h3 className="text-xl font-heading font-bold mb-6 text-white">
                  Rankings 2026
                </h3>

                <div className="space-y-5">
                  {college.rankings.nirf && (
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-white/80">NIRF Rank</span>
                      <span className="text-2xl font-black text-accent">
                        #{college.rankings.nirf}
                      </span>
                    </div>
                  )}
                  {college.rankings.naacGrade && (
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-white/80">NAAC Grade</span>
                      <span className="text-2xl font-black text-primary-soft">
                        {college.rankings.naacGrade}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Admissions */}
            {college.admission?.process && (
              <div className="bg-bg-surface p-6 rounded-card border border-border shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="text-accent" />
                  <h3 className="font-heading font-bold text-lg">Admissions</h3>
                </div>

                <p className="text-sm bg-bg-main p-4 rounded-card border-l-4 border-accent mb-4">
                  {college.admission.process}
                </p>

                <div className="space-y-3">
                  {college.admission.applicationEnd && (
                    <div className="bg-bg-main p-3 rounded-card border border-border">
                      <p className="text-[10px] uppercase font-black text-muted">
                        Deadline
                      </p>
                      <p className="font-bold">
                        Ends{" "}
                        {new Date(
                          college.admission.applicationEnd
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {college.admission.entranceExams?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {college.admission.entranceExams.map((exam: string) => (
                        <span
                          key={exam}
                          className="bg-primary text-white px-3 py-1 rounded text-[10px] font-black uppercase"
                        >
                          {exam}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Facilities */}
            {college.facilities && Object.values(college.facilities).some((v) => v === true) && (
              <div className="bg-bg-surface p-6 rounded-card border border-border shadow-soft">
                <h3 className="font-heading font-bold text-lg mb-4">
                  Campus Facilities
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(college.facilities)
                    .filter(([_, v]) => v === true)
                    .map(([key]) => {
                      const f = FACILITY_CONFIG[key];
                      return (
                        f && (
                          <div
                            key={key}
                            className="flex items-center gap-2 p-3 rounded-btn border border-border bg-bg-main hover:border-primary transition-all"
                          >
                            <span className="text-muted">{f.icon}</span>
                            <span className="text-[10px] font-bold uppercase">
                              {f.label}
                            </span>
                          </div>
                        )
                      );
                    })}
                </div>
              </div>
            )}

            {/* Contact */}
            {(college.contact?.phone || college.contact?.email || college.location?.address) && (
              <div className="bg-primary p-6 rounded-card shadow-lg text-white">
                <h3 className="font-heading font-bold text-lg mb-6 text-white">
                  Contact Us
                </h3>

                <div className="space-y-4">
                  {college.contact.phone && (
                    <a
                      href={`tel:${college.contact.phone}`}
                      className="flex items-center gap-3"
                    >
                      <Phone size={18} />
                      <span className="font-bold text-sm">
                        {college.contact.phone}
                      </span>
                    </a>
                  )}

                  {college.contact.email && (
                    <a
                      href={`mailto:${college.contact.email}`}
                      className="flex items-center gap-3"
                    >
                      <Mail size={18} />
                      <span className="font-bold text-sm truncate">
                        {college.contact.email}
                      </span>
                    </a>
                  )}

                  {college.location.address && (
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <MapPin className="text-accent" />
                      <p className="text-[11px] text-white/70">
                        {college.location.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="text-primary" size={32} />
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-heading mb-3">
                Register to Download
              </h3>
              
              <p className="text-muted text-sm mb-6">
                Please register first to download the college brochure and access exclusive content.
              </p>

              <button
                onClick={() => router.push("/signup")}
                className="w-full bg-primary hover:bg-heading text-white font-heading font-semibold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Register Now
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="w-full mt-3 text-muted hover:text-heading font-medium py-2 text-sm transition"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeDetailsWrapper;
