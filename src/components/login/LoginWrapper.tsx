"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { toast } from "react-toastify";
import Image from "next/image";

/* ===============================
   Types
================================ */
interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginWrapper() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await login(values.email, values.password);
        if (res.success) {
          toast.success("Login Successfully");
          router.push("/");
        } else {
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
      }
    },
  });

  const fieldError = (name: keyof LoginFormValues) =>
    formik.touched[name] && formik.errors[name];

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4 md:p-10 font-body relative">
      {/* 🔥 SINGLE SEO H1 (Hidden but crawlable) */}
      <h1 className="sr-only">
        Login to Vidya Udbhav Student & Career Guidance Portal
      </h1>

      {/* 🔥 SEO Helper Text */}
      <p className="sr-only">
        Vidya Udbhav login page for students and job seekers to securely access
        their personalized career dashboard, education guidance, and academic
        resources.
      </p>

      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-primary hover:text-accent transition-colors group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="font-semibold text-sm">Back to Home</span>
      </Link>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-bg-surface rounded-[2rem] shadow-soft overflow-hidden">
        {/* ================= LEFT PANEL ================= */}
        <div className="relative hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-primary overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1541339907198-e08759dfc3f3?q=80&w=2070&auto=format&fit=crop"
              alt="University campus representing student career success"
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
                Student Career Portal
              </span>
            </div>

            {/* Changed from H1 → H2 (SEO fix) */}
            <h2 className="text-4xl font-heading font-extrabold text-white leading-tight mb-6">
              Continue Your <br />
              <span className="text-accent">Career Journey</span>
            </h2>

            <div className="space-y-3">
              {[
                "Access Your Student Dashboard",
                "Track College & Career Applications",
                "Expert Education & Career Guidance",
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
              “Your career journey begins by logging in and taking the next
              step toward success.”
            </p>
          </div>
        </div>

        {/* ================= FORM PANEL ================= */}
        <div className="lg:col-span-7 p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-8">
            {/* Changed from H1 → H2 */}
            <h2 className="text-3xl font-heading font-bold text-heading mb-2">
              Sign In to Vidya Udbhav
            </h2>
            <p className="text-sm text-muted">
              Login to access your student dashboard and career tools.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <InputField
              label="Email Address"
              icon={<Mail size={18} />}
              error={fieldError("email")}
              inputProps={formik.getFieldProps("email")}
              placeholder="example@mail.com"
            />

            <InputField
              label="Password"
              icon={<Lock size={18} />}
              error={fieldError("password")}
              inputProps={{
                ...formik.getFieldProps("password"),
                type: "password",
              }}
              placeholder="••••••••"
            />

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-primary hover:text-accent"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-heading text-bg-surface font-heading font-semibold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <span className="flex items-center gap-2">
                  Login <ArrowRight size={18} />
                </span>
              )}
            </Button>

            <p className="text-center text-sm text-muted">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary font-semibold hover:text-accent underline-offset-4 hover:underline"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ===============================
   Reusable Input Field
================================ */
function InputField({ label, icon, error, inputProps, placeholder }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = inputProps.type === "password";

  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : inputProps.type || "text";

  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-heading/60 ml-1">
        {label}
      </label>

      <div className="relative">
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2 ${
            error ? "text-error" : "text-muted"
          }`}
        >
          {icon}
        </div>

        <input
          {...inputProps}
          type={inputType}
          placeholder={placeholder}
          className={`w-full pl-11 ${
            isPasswordField ? "pr-12" : "pr-4"
          } py-3.5 rounded-xl bg-primary-soft text-sm font-medium outline-none transition-all
            ${
              error
                ? "border border-error focus:border-error focus:ring-2 focus:ring-error/20"
                : "border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white"
            }`}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-error text-[10px] font-semibold ml-1">{error}</p>
      )}
    </div>
  );
}
