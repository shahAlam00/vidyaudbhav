"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  UserPlus,
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Phone,
  Mail,
  GraduationCap,
  BookOpen,
  Headset,
  Home,
} from "lucide-react";
import Image from "next/image";
import { getAuth, logout } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import { getProfilePicture } from "@/lib/profile";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const auth = getAuth();
  const isAuthenticated = !!auth?.token;

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getProfilePicture()
        .then((res) => setProfileData(res.profile || res.data || res))
        .catch(() => setProfileData(null));
    }
  }, [isAuthenticated]);

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const renderUserAvatar = () => {
    if (!isAuthenticated) {
      return <div className="bg-primary-soft text-primary  rounded-full p-2.5 hover:bg-[#1d5ed2] hover:text-white transition flex items-center justify-center">
        <User size={18} />
      </div>;
    }

    if (profileData?.profilePicture) {
      return (
        <img
          src={profileData.profilePicture}
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover"
        />
      );
    }

    if (profileData?.name) {
      return (
        <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
          {getInitials(profileData.name)}
        </div>
      );
    }

    return (
      <div className="bg-primary-soft text-primary  rounded-full p-2.5 hover:bg-[#1d5ed2] hover:text-white transition flex items-center justify-center">
        <User size={18} />
      </div>
    );
  };

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.replace("/");
    router.refresh();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        desktopDropdownRef.current?.contains(target) ||
        mobileDropdownRef.current?.contains(target)
      ) {
        return;
      }
      setIsUserDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleUserClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsUserDropdownOpen((prev) => !prev);
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 !z-[500] sticky top-0 font-body">
      <div className="custom-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={handleLinkClick}>
            <Image
              src="/logo.png"
              alt="logo"
              width={150}
              height={150}
              className="w-[120px] md:w-[150px] object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-heading">
            <Link
              href="/our-counsellors"
              className={`hover:text-primary transition ${
                isActiveLink("/our-counsellors") ? "text-primary font-semibold" : ""
              }`}
            >
              Free Counselling
            </Link>
            <Link 
              href="/colleges" 
              className={`hover:text-primary transition ${
                isActiveLink("/colleges") ? "text-primary  font-semibold" : ""
              }`}
            >
              Colleges
            </Link>
            <Link 
              href="/blogs" 
              className={`hover:text-primary transition ${
                isActiveLink("/blogs") ? "text-primary font-semibold" : ""
              }`}
            >
              Blogs
            </Link>
            <Link 
              href="/contact" 
              className={`hover:text-primary transition ${
                isActiveLink("/contact") ? "text-primary font-semibold" : ""
              }`}
            >
              Contact
            </Link>

            {isAuthenticated ? (
              <div className="relative" ref={desktopDropdownRef}>
                <button onClick={handleUserClick} className="" aria-label="User menu">
                  {renderUserAvatar()}
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <Link
                      href="/user"
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-primary-soft transition"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <button className="p-2.5 rounded-full text-primary bg-primary-soft active:scale-95 transition">
                  <User size={20} />
                </button>
              </Link>
            )}
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 md:hidden">
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={handleUserClick}
                className=""
                aria-label="User menu"
              >
                {renderUserAvatar()}
              </button>

              {isAuthenticated && isUserDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <Link
                    href="/user"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => setIsMobileMenuOpen(true)} className="p-1" aria-label="Open menu">
              <Menu size={28} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* --- ENHANCED MOBILE SIDEBAR --- */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-0 left-0 h-full w-[80%] max-w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex justify-between items-center h-16 px-5 border-b bg-gray-50/50">
            <Image
              src="/logo.png"
              alt="logo"
              width={110}
              height={40}
              className="object-contain"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 bg-white rounded-full shadow-sm border border-gray-100 text-gray-500"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="p-5 flex flex-col gap-1 overflow-y-auto flex-grow">
            {/* <p className="text-[10px] uppercase tracking-widest  font-bold mb-2 ml-2">Main Menu</p> */}

            <MobileNavLink
              href="/"
              icon={<Home size={20} />}
              label="Home"
              onClick={handleLinkClick}
              isActive={isActiveLink("/")}
            />
            <MobileNavLink
              href="/our-counsellors"
              icon={<Headset size={20} />}
              label="Free Counselling"
              onClick={handleLinkClick}
              isActive={isActiveLink("/our-counsellors")}
            />
            <MobileNavLink
              href="/colleges"
              icon={<GraduationCap size={20} />}
              label="Colleges"
              onClick={handleLinkClick}
              isActive={isActiveLink("/colleges")}
            />
            <MobileNavLink
              href="/blogs"
              icon={<BookOpen size={20} />}
              label="Blogs"
              onClick={handleLinkClick}
              isActive={isActiveLink("/blogs")}
            />
            <MobileNavLink
              href="/contact"
              icon={<Mail size={20} />}
              label="Contact Us"
              onClick={handleLinkClick}
              isActive={isActiveLink("/contact")}
            />
          </nav>

          {/* Sidebar Footer / Contact Card */}
          <div className="p-5 border-t bg-gray-50">
            <div className="bg-primary rounded-2xl p-4 text-white shadow-lg shadow-primary/20">
              <p className="font-bold text-sm mb-3">Need Assistance?</p>
              <div className="space-y-2.5">
                <a
                  href="tel:+91 8081130669"
                  className="flex items-center gap-3 text-xs opacity-90 hover:opacity-100"
                >
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <Phone size={14} />
                  </div>
                  +91 8081130669
                </a>
                <a
                  href="mailto:info@vidyaudbhav.com"
                  className="flex items-center gap-3 text-xs opacity-90 hover:opacity-100"
                >
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <Mail size={14} />
                  </div>
                  info@vidyaudbhav.com
                </a>
              </div>
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-4">
              © 2026 Vidya Udbhav. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

// Helper component for mobile links
function MobileNavLink({
  href,
  icon,
  label,
  onClick,
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3.5 font-medium rounded-xl transition-all ${
        isActive 
          ? "bg-primary text-white" 
          : "hover:bg-primary-soft hover:text-primary active:bg-primary-soft"
      }`}
    >
      <span className={isActive ? "text-white" : "group-hover:text-primary"}>{icon}</span>
      <span className="text-[15px]">{label}</span>
    </Link>
  );
}
