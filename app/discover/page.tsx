/** @format */
"use client";
import AlgeriaMap from "@/ui/components/map/Algria";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import Spinner from "@/ui/shared/Spinner";
import { useMemo, useState } from "react";
import PlanCard from "@/ui/components/cards/planCard";
import { plans } from "@/data/planes";
import EmptyPlanCard from "@/ui/components/cards/EmptyCard";
import { LocationConfig } from "@/domain/marker";

export default function Page() {
  // const { data, isLoading, error } = useSWR(fetcher("/api/destinations"));
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handlePositionClick = (id: number) => {
    setActiveCardId(id);
    console.log(id);
  };

  const Map = useMemo(() => {
    const locations: { [key: number]: LocationConfig } = {};

    plans.forEach((plan, index) => {
      const loc = plan.destination?.location;
      if (loc) {
        locations[index] = {
          lat: loc.latitude,
          lng: loc.longitude,
          name: String(plan.destination.name),
          description: String(plan.destination.description ?? ""),
        };
      }
    });
    return (
      <AlgeriaMap
        locations={locations}
        handlePositionClick={handlePositionClick}
      />
    );
  }, [plans]);
  // if (isLoading) return <Spinner />;
  // if (error) return <div>error</div>;
  return (
    <div className="w-full h-full flex flex-col-reverse lg:flex-row  py-28">
      <div className="mt-6 lg:m-0 px-5">
        {activeCardId != null ? (
          <PlanCard plan={plans[activeCardId]} />
        ) : (
          <EmptyPlanCard />
        )}
      </div>
      {Map}
      {/* <div className="flex-1 h-full w-full rounded-[20px] bg-[var(--card-bg-hover)]">{Map}</div> */}
    </div>
  );
}