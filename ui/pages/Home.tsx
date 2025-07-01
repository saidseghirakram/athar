/** @format */
"use client"
import React from "react";
import Hero from "../components/home/Hero";
import Map from "../components/home/Map";
import WhyVolunteer from "../components/home/WhyVolunteer";
import SouvenirSection from "../components/home/SouvenirSection";
import DestinationsCarousel from "../components/home/Carroussel";
import { useRouter } from "next/navigation";
import TouristicAssistantSection from '../components/TouristicAssistantSection';

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
      <TouristicAssistantSection handleAskAi={handleAskAi} />
    </>
  );
}

export default Home;
