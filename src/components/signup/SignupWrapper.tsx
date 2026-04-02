"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signup } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

interface RegisterFormValues {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export default function SignupWrapper() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik<RegisterFormValues>({
    initialValues: { name: "", email: "", mobile: "", password: "" },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Too short").required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      mobile: Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required("Required"),
      password: Yup.string().min(6, "Min 6 chars").required("Required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await signup(values.email, values.password, values.name, values.mobile);
        if (res.success) {
          toast.success("Account created!");
          router.push("/login");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    },
  });

  const fieldError = (name: keyof RegisterFormValues) =>
    formik.touched[name] && formik.errors[name];

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-2 py-4 md:p-10 font-body relative">
      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-primary hover:text-accent transition-colors group z-20"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold text-xs md:text-sm">Back to Home</span>
      </Link>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-bg-surface rounded-[2rem] shadow-soft overflow-hidden">
        
        {/* ================= LEFT PANEL (SEO & WEB VITALS) ================= */}
        <div className="relative hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-primary overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1541339907198-e08759dfc3f3?q=80&w=2070&auto=format&fit=crop"
              alt="Admissions 2026 Academic Success"
              fill
              priority
              className="object-cover scale-110"
              sizes="33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-heading/90" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/20 mb-8">
              <Sparkles size={14} className="text-accent" />
              <span className="text-[10px] font-semibold tracking-widest text-white uppercase">
                Admissions 2026 Now Open
              </span>
            </div>

            <h1 className="text-4xl font-heading font-extrabold text-white leading-tight mb-6">
              Unlock Your <br />
              <span className="text-accent">Academic Potential</span>
            </h1>

            <div className="space-y-3">
              {[
                "Direct Admissions in Top Indian Colleges",
                "Expert Career Counseling & Mentorship",
                "Instant Scholarship Eligibility Checks",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent" size={18} />
                  <p className="text-sm text-white/90 font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 bg-white/5 backdrop-blur p-4 rounded-xl border border-white/10">
            <p className="text-xs text-white/70 italic leading-relaxed">
              “Start your professional journey today with India's most trusted educational advisory.”
            </p>
          </div>
        </div>

        {/* ================= FORM PANEL (MOBILE OPTIMIZED) ================= */}
        <div className="lg:col-span-7 p-6 md:p-14 flex flex-col justify-center">
          <div className="mb-6 md:mb-8 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading mb-2">
              Create Your Account
            </h2>
            <p className="text-xs md:text-sm text-muted">
              Join <span className="text-primary font-semibold">10,000+ students</span> 
              <span className="hidden sm:inline"> securing admissions in top-tier colleges</span> and accelerating career growth.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-5">
            <InputField
              label="Full Name"
              icon={<User size={18} />}
              error={fieldError("name")}
              inputProps={formik.getFieldProps("name")}
              placeholder="Enter your full name"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <InputField
                label="Email Address"
                icon={<Mail size={18} />}
                error={fieldError("email")}
                inputProps={formik.getFieldProps("email")}
                placeholder="example@mail.com"
              />
              <InputField
                label="Phone Number"
                icon={<Phone size={18} />}
                error={fieldError("mobile")}
                inputProps={formik.getFieldProps("mobile")}
                placeholder="10 digit number"
              />
            </div>

            <InputField
              label="Secure Password"
              icon={<Lock size={18} />}
              error={fieldError("password")}
              inputProps={{ ...formik.getFieldProps("password"), type: "password" }}
              placeholder="Create a secure password"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-heading text-white font-heading font-semibold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <span className="flex items-center gap-2 justify-center">
                  Create Account <ArrowRight size={18} />
                </span>
              )}
            </Button>

            <p className="text-center text-sm text-muted">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold hover:text-accent underline-offset-4 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ===============================
   Reusable Input Field (Mobile Optimized)
================================ */
function InputField({ label, icon, error, inputProps, placeholder }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = inputProps.type === "password";
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : inputProps.type || "text";

  return (
    <div className="space-y-1">
      {/* SEO Label: Hidden on mobile, visible on desktop */}
      <label className="hidden md:block text-[11px] font-semibold uppercase tracking-wider text-heading/60 ml-1">
        {label}
      </label>

      <div className="relative">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${error ? "text-red-500" : "text-slate-400"}`}>
          {icon}
        </div>

        <input
          {...inputProps}
          type={inputType}
          placeholder={placeholder}
          className={`w-full pl-11 ${isPasswordField ? "pr-12" : "pr-4"} py-3 md:py-3.5 rounded-xl bg-slate-50 text-sm font-medium outline-none transition-all
            ${error ? "border border-red-500 focus:ring-2 focus:ring-red-200" : "border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-white"}`}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-[10px] font-semibold ml-1">{error}</p>}
    </div>
  );
}