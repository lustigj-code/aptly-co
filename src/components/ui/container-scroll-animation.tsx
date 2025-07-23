"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.1, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.3, 1], [55, 30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], isMobile ? [0.5, 0.7, 0.9] : [0.7, 0.9, 1.1]);
  const translate = useTransform(scrollYProgress, [0, 0.3, 1], [200, 100, 0]);

  return (
    <div
      className="h-[50rem] md:h-[60rem] flex items-center justify-center relative p-4 md:p-12"
      ref={containerRef}
    >
      <div
        className="py-8 md:py-12 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} rotate={rotate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, rotate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        rotateX: rotate,
        transformStyle: "preserve-3d",
      }}
      className="max-w-6xl mx-auto text-center mb-6 md:mb-8 relative z-30"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-6xl -mt-12 mx-auto h-[40rem] md:h-[50rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className=" h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 ">
        {children}
      </div>
    </motion.div>
  );
};