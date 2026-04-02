"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  X,
  User,
  Bookmark,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";
import { logout } from "@/lib/auth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { href: "/user", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/user/profile", icon: User, label: "Profile" },
  { href: "/user/bookmark", icon: Bookmark, label: "Bookmarks" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };
  const handleLogout = () => {
    logout();
    router.replace("/");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between lg:justify-center px-2  border-b">
          <Link href="/">
            <img
              src="/logo.png"
              alt="logo"
              className="w-[139px] object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href, item.exact)
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
