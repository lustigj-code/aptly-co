import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function BackgroundGradientAnimationDemo() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(0, 0, 0)"
      gradientBackgroundEnd="rgb(15, 15, 15)"
      firstColor="59, 130, 246"
      secondColor="147, 51, 234"
      thirdColor="34, 197, 94"
      fourthColor="239, 68, 68"
      fifthColor="245, 158, 11"
      pointerColor="59, 130, 246"
      size="80%"
      blendingValue="screen"
    >
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Learning That Sticks
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
} 