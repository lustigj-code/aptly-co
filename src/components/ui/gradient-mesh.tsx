"use client";
import { motion } from "framer-motion";

interface GradientMeshProps {
  className?: string;
  colors?: string[];
  animate?: boolean;
}

export default function GradientMesh({ 
  className = "", 
  colors = ["blue", "purple", "pink", "cyan"],
  animate = true 
}: GradientMeshProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0C2A] via-[#1e3a8a]/20 to-[#0A0C2A]" />
      
      {/* Animated mesh blobs */}
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className={`absolute w-[600px] h-[600px] rounded-full filter blur-3xl opacity-20`}
          style={{
            background: `radial-gradient(circle, ${getColorValue(color)} 0%, transparent 70%)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={animate ? {
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          } : {}}
          transition={{
            duration: 20 + index * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

function getColorValue(color: string): string {
  const colorMap: { [key: string]: string } = {
    blue: "#3b82f6",
    purple: "#a855f7",
    pink: "#ec4899",
    cyan: "#06b6d4",
    green: "#10b981",
    orange: "#f97316",
    indigo: "#6366f1",
  };
  return colorMap[color] || "#3b82f6";
}