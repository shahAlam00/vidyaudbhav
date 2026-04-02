import type { Metadata } from "next";
import Image from "next/image";
import { getCounsellorsById } from "@/lib/counsellor";
import { MapPin, Phone, GraduationCap, Languages } from "lucide-react";

interface PageProps {
  params: {
    id: string;
  };
}

/* ================== DYNAMIC METADATA ================== */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const result = await getCounsellorsById(id);
  const counsellor = result?.data;

  if (!counsellor) {
    return {
      title: "Counsellor Not Found | Vidya Udbhav",
      description:
        "The counsellor you are looking for is unavailable or does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const name = counsellor.name;
  const designation = counsellor.designation || "Professional Counsellor";
  const expertise = counsellor.professionalExpertise || "Career Guidance";
  const location = counsellor.location || "India";

  return {
    title: `${name} | ${designation} in ${location}`,
    description: `Book a session with ${name}, an experienced ${designation} specializing in ${expertise}. Get personalized career and mental health guidance.`,
    keywords: [
      name,
      designation,
      expertise,
      "career counsellor",
      "mental health counsellor",
      "online counselling",
      location,
    ],
    openGraph: {
      title: `${name} | Expert Counsellor`,
      description: `Consult ${name}, a trusted ${designation} offering expert guidance in ${expertise}.`,
      url: `https://vidyaudbhav.com/our-counsellors/${id}`,
      siteName: "Vidya Udbhav",
      images: [
        {
          url: counsellor.profileImage || "/og-counsellors.jpg",
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Counsellor Profile`,
      description: `Connect with ${name} for professional counselling and guidance.`,
      images: [counsellor.profileImage || "/og-counsellors.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://vidyaudbhav.com/our-counsellors/${id}`,
    },
  };
}

/* ================== PAGE UI ================== */
export default async function CounsellorDetailPage({ params }: PageProps) {
  const { id } = await params;

  const result = await getCounsellorsById(id);

  if (!result.data) {
    return (
      <div className="min-h-screen py-10">
        <div className="custom-container text-center">
          <h1 className="text-2xl font-bold mb-4">Counsellor Not Found</h1>
          <p className="text-gray-600">
            The counsellor you're looking for doesn't exist or is unavailable.
          </p>
        </div>
      </div>
    );
  }

  const counsellor = result.data;

  return (
    <div className=" min-h-screen py-10">
      <div className="custom-container grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
        {/* ================= LEFT PROFILE CARD ================= */}
        <aside className="bg-white rounded-2xl shadow p-6 h-fit">
          <div className="relative w-full h-72 rounded-xl overflow-hidden">
            <Image
              src={counsellor?.profileImage || "/placeholder-avatar.jpg"}
              alt={counsellor?.name || "Counsellor"}
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-xl font-semibold mt-4">
            {counsellor?.name || "Unknown"}
          </h2>

          <p className="text-primary text-sm font-medium">
            {counsellor?.designation || "Counsellor"}
          </p>

          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              🎓 {counsellor?.experience || 0} Years Experience
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {counsellor?.location || "Not specified"}
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              {counsellor?.phone || "Not available"}
            </div>

            <div className="flex items-center gap-2 font-semibold text-green-600">
              ₹{" "}
              {counsellor?.consultationType === "Free"
                ? "Free Consultation"
                : "Paid"}
            </div>
          </div>
        </aside>

        {/* ================= RIGHT DETAILS ================= */}
        <section className="bg-white rounded-2xl shadow p-8">
          {/* Expertise */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Professional Expertise
            </h3>
            <span className="inline-block bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-lg">
              {counsellor?.professionalExpertise}
            </span>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {counsellor?.about}
            </p>
          </div>

          <hr className="my-8" />

          {/* Education & Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 font-semibold">
                <GraduationCap size={18} />
                Education
              </div>
              <p className="text-gray-700">{counsellor?.education}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2 font-semibold">
                <Languages size={18} />
                Languages
              </div>
              <div className="flex flex-wrap gap-2">
                {counsellor?.languages?.map((lang: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-sm px-3 py-1 rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h4 className="font-semibold mb-4">Key Highlights</h4>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              {counsellor?.keyHighlights?.map((item: string, index: number) => (
                <li key={index} className="flex gap-2">
                  ✔ {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
