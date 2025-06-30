/** @format */

import { Sprout } from "lucide-react";

const EmptyPlanCard = () => {
  return (
    <div className="w-full h-auto md:max-w-96 grid space-y-6">
      <div className="px-2.5 py-6 rounded-[20px] border border-black text-center">
        <h1 className="text-[var(--text)] text-2xl font-semibold">
          Select a destination
        </h1>
        <p className="text-muted-foreground mt-2">
          Plan details will appear here once you select a destination.
        </p>
      </div>
      <div className="rounded-[20px] border border-black px-1.5 py-4 flex justify-center items-center gap-x-4">
        <Sprout />
        Environmental Protection
      </div>
      <div className="rounded-[20px] border border-black px-5 py-4 text-center text-muted-foreground">
        <p>No fees available</p>
      </div>
    </div>
  );
};

export default EmptyPlanCard;
