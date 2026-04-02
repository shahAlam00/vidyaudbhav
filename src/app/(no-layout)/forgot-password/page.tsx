"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/lib/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

/* ===============================
   Types
================================ */
interface ForgotPasswordValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik<ForgotPasswordValues>({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await forgotPassword(values.email);

        if (res.success) {
          toast.success("OTP sent to your email");
          sessionStorage.setItem("resetEmail", values.email);
          router.push("/reset-password");
        } else {
          setIsLoading(false);
        }
      } catch (error: any) {
        console.error("OTP sent Error:", error);
        setIsLoading(false);
      }
    },
  });

  const fieldError = formik.touched.email && formik.errors.email;

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4 md:p-10 font-body relative">
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-primary hover:text-accent transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold text-sm">Back to Home</span>
      </Link>
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-bg-surface rounded-[2rem] shadow-soft overflow-hidden">
        {/* ================= LEFT PANEL ================= */}
        <div className="relative hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-primary overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover scale-110"
              alt="Campus"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-heading/90" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/20 mb-8">
              <Sparkles size={14} className="text-accent" />
              <span className="text-[10px] font-semibold tracking-widest text-white uppercase">
                Password Recovery
              </span>
            </div>

            <h2 className="text-4xl font-heading font-extrabold text-white leading-tight mb-6">
              Reset Your <br />
              <span className="text-accent">Access</span>
            </h2>

            <div className="space-y-3">
              {[
                "Secure Email Verification",
                "Quick Reset Process",
                "Account Protection",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent" size={18} />
                  <span className="text-sm text-white/90 font-medium">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 bg-white/5 backdrop-blur p-4 rounded-xl border border-white/10">
            <p className="text-xs text-white/70 italic leading-relaxed">
              “Security is not a product, but a process.”
            </p>
          </div>
        </div>

        {/* ================= FORM PANEL ================= */}
        <div className="lg:col-span-7 p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-heading mb-2">
              Forgot Password
            </h1>
            <p className="text-sm text-muted">
              Enter your registered email and we’ll send you a reset link.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <InputField
              label="Email Address"
              icon={<Mail size={18} />}
              error={fieldError}
              inputProps={formik.getFieldProps("email")}
              placeholder="example@gmail.com"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-heading text-bg-surface font-heading font-semibold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <span className="flex items-center gap-2">
                  Send OTP <ArrowRight size={18} />
                </span>
              )}
            </Button>

            <p className="text-center text-sm text-muted">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-primary font-semibold hover:text-accent underline-offset-4 hover:underline"
              >
                Back to Login
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
          placeholder={placeholder}
          className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-primary-soft text-sm font-medium outline-none transition-all
            ${
              error
                ? "border border-error focus:border-error focus:ring-2 focus:ring-error/20"
                : "border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white"
            }`}
        />
      </div>

      {error && (
        <p className="text-error text-[10px] font-semibold ml-1">{error}</p>
      )}
    </div>
  );
}
