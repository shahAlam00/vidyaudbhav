"use client";

import { Menu, Bell, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getProfilePicture } from "@/lib/profile";
import { isAuthenticated } from "@/lib/auth";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      getProfilePicture()
        .then((res) => setProfileData(res.profile || res.data || res))
        .catch(() => setProfileData(null));
    }
  }, []);

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const renderUserAvatar = () => {
    if (profileData?.profilePicture) {
      return (
        <img
          src={profileData.profilePicture}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      );
    }

    if (profileData?.name) {
      return (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-semibold">
          {getInitials(profileData.name)}
        </div>
      );
    }

    return (
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
        <User size={16} className="text-white" />
      </div>
    );
  };
  return (
    <header className="bg-white shadow-sm border-b sm:px-6 px-4 py-5 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-xl font-semibold text-gray-800">Welcome Back!</h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-40"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3">
            {renderUserAvatar()}
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800">
                {profileData?.name || "Student"}
              </p>
              <p className="text-xs text-gray-500">
                {profileData?.email || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
