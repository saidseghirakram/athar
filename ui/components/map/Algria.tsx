/** @format */
"use client";
import { LocationConfig } from "@/domain/marker";
import Spinner from "@/ui/shared/Spinner";
import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";
const AlgeriaMap = ({
  locations,
  handlePositionClick,
}: {
  locations: { [key: number]: LocationConfig };
  handlePositionClick: (id: number) => void;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSvgLoaded = () => {
      try {
        const svg = document.querySelector(
          "#map #map_inner svg"
        ) as SVGSVGElement;
        if (svg && window.simplemaps_countrymap?.load) {
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

  useEffect(() => {
    if (!isLoading) {
      const svg = document.querySelector(
        "#map #map_inner svg"
      ) as SVGSVGElement;
      if (!svg) return;

      const points = svg.querySelectorAll("circle.sm_location");

      points.forEach((point) => {
        const classList = point.getAttribute("class") || "";
        const match = classList.match(/sm_location_(\d+)/);
        if (!match) return;

        const id = Number(match[1]);
        const location = locations[id];
        if (!location) return;
        point.addEventListener("click", () => handlePositionClick(id));
      });
    }
  }, [isLoading, locations]);

  if (error) {
    return (
      <div className="error-message">
        <p>Error loading map: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  //    const cx = parseFloat(point.getAttribute("cx") || "0");
  //         const cy = parseFloat(point.getAttribute("cy") || "0");

  //         const text = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "text"
  //         );
  //         text.textContent = location.name;
  //         text.setAttribute("x", (cx - 10).toString()); // 10px to the left
  //         text.setAttribute("y", cy.toString());
  //         text.setAttribute("text-anchor", "end");
  //         text.setAttribute("alignment-baseline", "middle");
  //         text.setAttribute("fill", "#333");
  //         text.setAttribute("font-size", "12px");
  //         text.setAttribute("class", "custom-label");

  //         // Append to SVG root
  //         svg.appendChild(text);
  return (
    <div className="relative flex-1 flex justify-center items-center">
      <Script
        src="/scripts/mapdata.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.mapdata = window.simplemaps_countrymap_mapdata;
          Object.assign(window.mapdata.locations, locations);
        }}
        onError={() => setError("Failed to load map data")}
      />
      <Script
        src="/scripts/countrymap.js"
        strategy="lazyOnload"
        onError={() => setError("Failed to load country map")}
      />
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 translate-y-1/2 -translate-x-1/2">
          <Spinner />
        </div>
      )}

      <div id="map"></div>
    </div>
  );
};

export default AlgeriaMap;
