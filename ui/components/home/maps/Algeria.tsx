/** @format */
"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { LocationConfig } from "@/domain/marker";
import Spinner from "@/ui/shared/Spinner";

const AlgeriaMap = ({
  locations,
}: {
  locations: { [key: number]: LocationConfig };
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSvgLoaded = () => {
      try {
        const svg = document.querySelector(
          "#map #map_inner svg"
        ) as SVGSVGElement;
        if (svg && window.simplemaps_countrymap?.load) {
          window.mapdata = window.simplemaps_countrymap_mapdata;
          Object.assign(window.mapdata.locations, locations);
          window.simplemaps_countrymap.load();
          return true;
        }
        return false;
      } catch (err) {
        setError("Failed to load map resources");
        return false;
      }
    };

    const interval = setInterval(() => {
      if (checkSvgLoaded()) {
        setIsLoading(false);
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="error-message">
        <p>Error loading map: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <Script
        src="/scripts/mapdata.js"
        strategy="lazyOnload"
        onError={() => setError("Failed to load map data")}
      />
      <Script
        src="/scripts/countrymap.js"
        strategy="lazyOnload"
        onError={() => setError("Failed to load country map")}
      />

      {isLoading && <Spinner />}
      <div id="map"></div>
    </div>
  );
};

export default AlgeriaMap;
