const BlogSkeleton = () => (
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {[...Array(6)].map((_, i) => (
      <div 
        key={i} 
        className="border border-gray-200 rounded-xl overflow-hidden bg-white h-full animate-pulse"
      >
        {/* Image Area */}
        <div className="relative h-48 bg-gray-200">
          <div className="absolute top-3 left-3 flex gap-2">
            <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5">
          {/* Metadata Row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
            <div className="ml-auto w-12 h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Title Lines */}
          <div className="space-y-2 mb-3">
            <div className="h-5 bg-gray-300 rounded w-full"></div>
            <div className="h-5 bg-gray-300 rounded w-4/5"></div>
          </div>

          {/* Excerpt Lines */}
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>

          {/* Author Footer */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-300 rounded w-24"></div>
              <div className="h-2 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default BlogSkeleton