"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {
  Lock,
  Mail,
  Hash,
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
import { toast } from "react-toastify";
import { resetPassword } from "@/lib/auth";

/* ===============================
   Types
================================ */
interface ResetPasswordValues {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik<ResetPasswordValues>({
    initialValues: {
      email: "", // Will be set in useEffect
      otp: "",
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true, // Allows initialValues to update when state changes
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      otp: Yup.string()
        .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
        .required("OTP is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await resetPassword({
          email: values.email,
          otp: values.otp,
          password: values.password,
        });

        if (res.success) {
          toast.success("Password reset successfully");
          sessionStorage.removeItem("resetEmail");
          router.push("/login");
        } else {
          // toast.error(res.message || "Login failed");
          setIsLoading(false);
        }
      } catch (error: any) {
        console.error("Login Error:", error);
        // toast.error(error.message || "Something went wrong");
        setIsLoading(false);
      }
    },
  });

  // Load email from sessionStorage on mount
  useEffect(() => {
    const savedEmail = sessionStorage.getItem("resetEmail");
    if (savedEmail) {
      formik.setFieldValue("email", savedEmail);
    } else {
      toast.warn("No reset session found. Please start again.");
      router.push("/forgot-password");
    }
  }, []);

  const fieldError = (name: keyof ResetPasswordValues) =>
    formik.touched[name] && formik.errors[name];

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
                Secure Reset
              </span>
            </div>
            <h2 className="text-4xl font-heading font-extrabold text-white leading-tight mb-6">
              Finalize Your <br />
              <span className="text-accent">New Security</span>
            </h2>
            <div className="space-y-3">
              {["Verify OTP", "Update Password", "Login Securely"].map(
                (text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent" size={18} />
                    <span className="text-sm text-white/90 font-medium">
                      {text}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* ================= FORM PANEL ================= */}
        <div className="lg:col-span-7 p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-heading mb-2">
              Complete Reset
            </h1>
            <p className="text-sm text-muted">
              Please fill in the details sent to your email.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* EMAIL FIELD (Read-Only) */}
            <InputField
              label="Reset Email"
              icon={<Mail size={18} />}
              error={fieldError("email")}
              inputProps={{
                ...formik.getFieldProps("email"),
                readOnly: true,
              }}
              placeholder="email@example.com"
            />

            {/* OTP FIELD */}
            <InputField
              label="OTP Code"
              icon={<Hash size={18} />}
              error={fieldError("otp")}
              inputProps={formik.getFieldProps("otp")}
              placeholder="Enter 6-digit OTP"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* NEW PASSWORD */}
              <InputField
                label="New Password"
                icon={<Lock size={18} />}
                error={fieldError("password")}
                inputProps={{
                  ...formik.getFieldProps("password"),
                  type: "password",
                }}
                placeholder="••••••••"
              />

              {/* CONFIRM PASSWORD */}
              <InputField
                label="Confirm Password"
                icon={<Lock size={18} />}
                error={fieldError("confirmPassword")}
                inputProps={{
                  ...formik.getFieldProps("confirmPassword"),
                  type: "password",
                }}
                placeholder="••••••••"
              />
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
                  Reset Password <ArrowRight size={18} />
                </span>
              )}
            </Button>

            <p className="text-center text-sm text-muted">
              Didn't get the code?{" "}
              <button
                type="button"
                className="text-primary font-semibold hover:underline"
              >
                Resend OTP
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ===============================
   Reusable Input Field Component
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
    <div className="space-y-1.5 w-full">
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
              inputProps.readOnly
                ? "opacity-70 cursor-not-allowed bg-gray-100"
                : ""
            }
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
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors focus:outline-none"
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
