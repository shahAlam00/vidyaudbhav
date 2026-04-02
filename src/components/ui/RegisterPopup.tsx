"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signup } from "@/lib/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function RegisterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const restrictedPages = ["/login", "/signup", "/forgot-password", "/reset-password", "/user"];
  const isRestrictedPage = restrictedPages.some(page => pathname.includes(page));

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  useEffect(() => {
    if (!isRestrictedPage) {
      const timer = setTimeout(() => setIsOpen(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isRestrictedPage]);

  // --- 1. NEW VALIDATION SCHEMA ---
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "Too short")
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets allowed")
      .required("Name required"),
    email: Yup.string()
      .lowercase()
      .email("Invalid email")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid format")
      .required("Email required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "10 digits required")
      .required("Required"),
    password: Yup.string().min(6, "Min 6 characters").required("Required"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", mobile: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await signup(values.email, values.password, values.name, values.mobile);
        if (res.success) {
          toast.success("Account created!");
          setIsOpen(false);
          router.refresh();
        }
      } catch (error) {
        toast.error("Signup failed");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // --- 2. INPUT FILTERING (CLIENT SIDE) ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    let value = e.target.value;
    if (field === "name") value = value.replace(/[^a-zA-Z\s]/g, ""); // Remove numbers/symbols
    if (field === "mobile") value = value.replace(/\D/g, "").slice(0, 10); // Only digits, max 10
    formik.setFieldValue(field, value);
  };

  if (isRestrictedPage || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-6">
      <div 
        className="absolute inset-0 bg-heading/80 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsOpen(false)} 
      />

      <div className="relative w-full max-w-5xl bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[98vh] sm:max-h-[95vh] animate-in fade-in zoom-in duration-300">
        
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-3 md:right-5 md:top-5 z-[70] p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        {/* LEFT PANEL: Marketing (Your Original Design) */}
        <div className="relative hidden lg:flex lg:w-[40%] flex-col justify-between p-10 bg-primary">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full mb-6">
              <Sparkles size={14} className="text-accent" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Admissions 2026</span>
            </div>
            <h2 className="text-3xl font-bold text-white leading-tight mb-6">
              Secure Your <br /> <span className="text-accent">Academic Future</span>
            </h2>
            <div className="space-y-3">
              {[
                "100% Admission Assistance",
                "Top 500+ Partner Colleges",
                "Personalized Career Roadmaps",
                "Instant Scholarship Checks",
                "Direct Campus Placements",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white/90">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="relative z-10 text-[11px] text-white/60 italic mt-8">
            * Join the most trusted education advisory in India.
          </p>
        </div>

        {/* RIGHT PANEL: Form Area */}
        <div className="flex-1 p-5 md:p-12 overflow-y-auto">
          <div className="mb-5 md:mb-8 text-center lg:text-left">
            <h1 className="text-xl md:text-3xl font-bold text-heading">
              Get Free Career Guidance
            </h1>
            <p className="text-xs md:text-sm text-muted mt-1">
              Join <span className="text-primary font-bold">10k+ students</span> building dream careers.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-3 md:space-y-4">
            <InputField
              label="Full Name"
              placeholder="Enter full name"
              icon={<User size={16} />}
              error={formik.touched.name && formik.errors.name}
              inputProps={{
                ...formik.getFieldProps("name"),
                onChange: (e: any) => handleInputChange(e, "name") // Strict Filter
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <InputField
                label="Email"
                placeholder="name@example.com"
                icon={<Mail size={16} />}
                error={formik.touched.email && formik.errors.email}
                inputProps={formik.getFieldProps("email")}
              />
              <InputField
                label="Mobile"
                placeholder="10 digit number"
                icon={<Phone size={16} />}
                error={formik.touched.mobile && formik.errors.mobile}
                inputProps={{
                  ...formik.getFieldProps("mobile"),
                  onChange: (e: any) => handleInputChange(e, "mobile") // Strict Filter
                }}
              />
            </div>

            <InputField
              label="Password"
              placeholder="Create Password"
              icon={<Lock size={16} />}
              isPassword
              error={formik.touched.password && formik.errors.password}
              inputProps={formik.getFieldProps("password")}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-heading text-white py-3.5 md:py-4 rounded-xl font-bold shadow-lg mt-2 transition-all active:scale-95"
            >
              {isLoading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Unlock Benefits Now"}
            </Button>

            <p className="text-center text-xs text-muted mt-4">
              By registering, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-primary">Terms</Link> &{" "}
              <Link href="/privacy" className="underline hover:text-primary">Privacy</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, icon, error, inputProps, isPassword, placeholder }: any) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <label className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
        <input
          {...inputProps}
          placeholder={placeholder}
          type={isPassword ? (show ? "text" : "password") : "text"}
          className={`w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 border rounded-xl text-sm outline-none transition-all
            ${error ? "border-red-400 ring-1 ring-red-100" : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10"}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <span className="text-[10px] text-red-500 font-medium ml-1">{error}</span>}
    </div>
  );
}