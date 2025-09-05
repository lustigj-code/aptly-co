export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0C2A]">
      <div className="relative">
        {/* Aptly logo animation */}
        <div className="flex items-center justify-center space-x-1">
          {/* Left circle */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-[#0A0C2A] animate-pulse"></div>
            <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-t-transparent border-[#0A0C2A] animate-spin"></div>
          </div>
          
          {/* Right circle */}
          <div className="relative -ml-3">
            <div className="w-12 h-12 rounded-full bg-[#7AB8BD] animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading text */}
        <p className="mt-6 text-white/70 text-center animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}