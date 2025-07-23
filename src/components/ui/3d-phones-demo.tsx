"use client";
import React from "react";
import Image from "next/image";

export default function ThreeDPhonesDemo() {
  return (
    <div className="relative w-full h-[1200px] flex items-center justify-center overflow-hidden">
      {/* Subtle gradient overlay to blend spotlight */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 pointer-events-none z-5"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.3) 0%, rgba(30, 58, 138, 0.1) 50%, transparent 100%)',
          mixBlendMode: 'multiply'
        }}
      ></div>
      
      {/* Floating Phones Image - Static */}
      <div className="relative z-10">
        <Image
          src="https://uploads.teachablecdn.com/attachments/AatrovdRsGjFRcDXmZ7R_Phone_app.png"
          alt="Smartphones with quiz question and response choices, learner images, and Aptly logo."
          width={700}
          height={500}
          className="w-auto h-auto max-w-none"
          style={{ 
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3)) brightness(1.2) contrast(1.2) saturate(1.1)',
            background: 'transparent',
            mixBlendMode: 'normal'
          }}
        />
      </div>
    </div>
  );
} 