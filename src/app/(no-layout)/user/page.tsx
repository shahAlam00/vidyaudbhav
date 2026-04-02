"use client";
import { isAuthenticated } from "@/lib/auth";
import { BookOpen, Bookmark, Calendar, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

const stats = [
  {
    title: "Total Bookmarks",
    value: "24",
    icon: Bookmark,
    color: "bg-blue-500"
  },
  {
    title: "Articles Read",
    value: "156",
    icon: BookOpen,
    color: "bg-green-500"
  },
  {
    title: "Sessions Attended",
    value: "8",
    icon: Calendar,
    color: "bg-purple-500"
  },
  {
    title: "Progress Score",
    value: "85%",
    icon: TrendingUp,
    color: "bg-orange-500"
  }
];

export default function UserDashboard() {
  const router = useRouter();
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }
  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Track your learning progress and manage your account</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Bookmarks */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Bookmarks</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Career Guidance Article {item}</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-medium text-sm">Book a Counseling Session</p>
              <p className="text-xs text-gray-500">Schedule with our experts</p>
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-medium text-sm">Update Profile</p>
              <p className="text-xs text-gray-500">Keep your information current</p>
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-medium text-sm">Browse Articles</p>
              <p className="text-xs text-gray-500">Discover new content</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}