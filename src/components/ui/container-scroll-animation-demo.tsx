"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Master Your Meta Certification <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                With Aptly Study
              </span>
            </h1>
          </>
        }
      >
        <Image
          src="https://uploads.teachablecdn.com/attachments/AatrovdRsGjFRcDXmZ7R_Phone_app.png"
          alt="Aptly Study App Interface"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
} 