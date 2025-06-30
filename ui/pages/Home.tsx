/** @format */
"use client"
import React from "react";
import Hero from "../components/home/Hero";
import Map from "../components/home/Map";
import WhyVolunteer from "../components/home/WhyVolunteer";
import SouvenirSection from "../components/home/SouvenirSection";
import DestinationsCarousel from "../components/home/Carroussel";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  const handleAskAi = () => {
    router.push("/ai");
  };

  return (
    <>
      <Hero />
      <WhyVolunteer />
      {/* <Map /> */}
      <DestinationsCarousel title="Impactful Plans" description="" />
      <SouvenirSection />
      <button
        onClick={handleAskAi}
        className="mt-14 w-full max-w-4xl py-16 mx-auto flex items-center justify-center gap-3 px-10  rounded-2xl bg-[#B4D191] hover:bg-[#256326] text-white text-2xl font-extrabold shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#2e7d32]/30 tracking-wide my-16"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Get Your Touristic Assistant
      </button>
    </>
  );
}

export default Home;
