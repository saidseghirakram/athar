"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const SCROLL_DISTANCE = 2000; // px

const Hero: React.FC = () => {
  const scrollY = useMotionValue(0);
  const rounded = useTransform(scrollY, [0, 1], [0, 64]); // 0px to 64px border-radius
  const videoWidth = useTransform(scrollY, [0, 1], ["100vw", "60vw"]); // Shrink width
  const videoHeight = useTransform(scrollY, [0, 1], ["100vh", "60vh"]); // Shrink height
  const [showNext, setShowNext] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / SCROLL_DISTANCE, 1);
      animate(scrollY, progress, { type: "tween", duration: 0.3 });
      setShowNext(window.scrollY >= SCROLL_DISTANCE);
      if (window.innerWidth < 768) {
        setScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <div className="relative w-full min-h-[2000px] bg-white mb-24 ">
      {/* Sticky Hero Section */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Video Container with Overlay */}
        <motion.div
          style={{
            borderRadius: rounded,
            width: videoWidth,
            height: videoHeight,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="overflow-hidden z-0"
        >
          {/* Video */}
          <video
            src="/video/dz.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-green-900 opacity-35 pointer-events-none" />
        </motion.div>

        {/* Foreground Content */}
        <div className="relative z-20 flex-col flex items-center justify-center h-full text-center px-4">
          <h1
            className={
              `text-white font-bold transition-all duration-300 ` +
              (scrolled ? "text-2xl" : "text-3xl") +
              " md:text-5xl"
            }
          >
            Make a Difference While Exploring Algeria
          </h1>
          <p
            className={
              `max-w-[700px] mt-8 text-white transition-all duration-300 ` +
              (scrolled ? "text-sm" : "text-base") +
              " md:text-2xl"
            }
          >
            Join meaningful volunteer programs in Algeria. Help communities, protect nature, and discover a country full of beauty and heritage
          </p>
        </div>
      </div>

      {/* Next Section */}
      {showNext && (
        <div className="w-full min-h-screen flex items-center justify-center bg-white">
          <div className="text-3xl font-bold">Next Section Content Here</div>
        </div>
      )}
    </div>
  );
};

export default Hero;
