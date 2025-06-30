"use client";

import dynamic from "next/dynamic";

const SmartMapLoader = dynamic(
  () => import("@/components/ai/SmartMapFiltersMap"),
  {
    loading: () => (
      <div className="w-full max-w-4xl h-[500px] flex items-center justify-center bg-gray-100 rounded-lg shadow border">
        <p className="text-gray-500">Loading map...</p>
      </div>
    ),
    ssr: false,
  }
);

export default SmartMapLoader; 