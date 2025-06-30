"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WhyVolunteer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden  mb-16"
      style={{
        backgroundImage: "url('/home/zelij.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      ref={ref}
    >
      {/* Pattern background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('/pattern.svg')] opacity-60" />
      </div>

      {/* Animated Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-x-hidden sm:overflow-x-visible z-10 bg-green-700 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-10 shadow-lg max-w-7xl w-full"
      >
        <div>
          <h2 className="text-white text-4xl md:text-8xl font-bold mb-4 leading-tight">
            Why
            <br />
            Volunteer
            <br />
            in Algeria?
          </h2>
        </div>

        <ul className="text-white text-lg md:text-xl space-y-4 list-disc pl-6">
          <li>Experience authentic North African culture</li>
          <li>Support underfunded local projects</li>
          <li>Discover hidden gems: from Sahara dunes to Mediterranean coasts</li>
          <li>Make real connections with local communities</li>
        </ul>

        {/* Stamp image */}
      <div className="absolute  hidden sm:block md:-bottom-40 md:-right-40  z-20 pointer-events-none overflow-hidden md:overflow-visible">
          <img
            src="/home/Sticker.png"
            alt="Algeria Stamp"
            className="w-96 h-100  object-contain"
          />
        </div>

      <div className="absolute  hidden sm:block -top-40 md:-left-60  z-20 pointer-events-none overflow-hidden md:overflow-visible">
          <img
            src="/home/dahman.png"
            alt="Algeria Stamp"
            className="w-86 h-90  object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default WhyVolunteer;
