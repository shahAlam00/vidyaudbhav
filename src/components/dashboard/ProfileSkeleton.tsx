import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="space-y-8 pb-10  animate-pulse">
      {/* Top Banner Section Skeleton */}
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Banner Gradient Placeholder */}
        <div className="h-32 bg-gray-200"></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row items-end gap-6 -mt-12">
            {/* Profile Image Circle */}
            <div className="relative">
              <div className="rounded-full w-[120px] h-[120px] border-4 border-white bg-gray-200 shadow-lg"></div>
            </div>
            
            {/* Name and Tagline */}
            <div className="flex-1 space-y-3 mb-2">
              <div className="h-8 bg-gray-200 rounded-md w-48 mx-auto md:mx-0"></div>
              <div className="h-4 bg-gray-200 rounded-md w-32 mx-auto md:mx-0"></div>
            </div>

            {/* Update Button Placeholder */}
            <div className="h-12 w-36 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-3">
              <div className="h-12 bg-gray-50 rounded-xl"></div>
              <div className="h-12 bg-gray-50 rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Me Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
            <div className="h-24 bg-gray-50 rounded-lg"></div>
          </div>

          {/* Academic Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-10 bg-gray-50 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section (Dark) */}
          <div className="bg-gray-800 p-8 rounded-3xl">
            <div className="h-7 bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="flex gap-2 mb-6">
              <div className="flex-1 h-10 bg-gray-700 rounded-xl"></div>
              <div className="w-10 h-10 bg-gray-700 rounded-xl"></div>
            </div>
            <div className="space-y-3">
              <div className="h-14 bg-gray-700/50 rounded-xl"></div>
              <div className="h-14 bg-gray-700/50 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;