import Image from "next/image";

interface SubtleLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "navy" | "teal" | "yellow" | "gradient";
}

export default function SubtleLogo({ 
  className = "", 
  size = "md", 
  variant = "gradient" 
}: SubtleLogoProps) {
  const sizeClasses = {
    sm: "w-16 h-10", // wider, less round
    md: "w-24 h-14", // wider, less round
    lg: "w-32 h-18" // much larger, less round
  };

  const opacityClasses = {
    navy: "opacity-10",
    teal: "opacity-8", 
    yellow: "opacity-6",
    gradient: "opacity-5"
  };

  return (
    <div className={`flex items-center ${opacityClasses[variant]} ${className}`} style={{lineHeight: 0}}>
      <Image
        src="/aptly-symbol.svg"
        alt="Aptly Symbol"
        width={120}
        height={54}
        className={`${sizeClasses[size]} w-auto align-middle`}
        style={{
          filter: variant === 'gradient' ? 'drop-shadow(0 0 8px rgba(122, 184, 189, 0.3))' : 'none',
          borderRadius: 0
        }}
      />
    </div>
  );
} 