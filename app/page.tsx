/** @format */

import Home from "@/ui/pages/Home";
import React from "react";

declare global {
  interface Window {
    simplemaps_countrymap_mapdata?: any;
    simplemaps_countrymap?: {
      loaded?: boolean;
      load: () => void;
      proj: any;
    };
    simplemaps_worldmap?: {
      loaded?: boolean;
      proj?: (lat: number, lng: number) => { x: number; y: number };
    };
    mapdata?: any;
  }
}

function page() {
  return (
    <div className="bg-white">
      <Home />
    </div>
  );
}

export default page;
