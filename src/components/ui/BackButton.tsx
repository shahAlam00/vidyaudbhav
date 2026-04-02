"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  className?: string;
  text?: string;
}

export default function BackButton({ className = "", text = "Back" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary border border-gray-300 rounded-lg hover:border-primary transition-colors ${className}`}
    >
      <ArrowLeft size={16} />
      {text}
    </button>
  );
}