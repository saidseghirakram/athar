/** @format */
"use client";
import Spinner from "@/ui/shared/Spinner";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { plans } from "@/data/planes";
import Image from "next/image";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PlanCard from "@/ui/components/cards/planCard";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id: userId } = use(params);
  const plan = plans[0];
  // const { data, error, isLoading } = useSWR<Plan>(
  //   `/api/user/${userId}`,
  //   fetcher
  // );

  // if (isLoading) return <Spinner />;
  // if (error) return <div>failed to load</div>;

  return (
    <div className="flex flex-col md:flex-row gap-4 py-28 px-5 md:px-8">
      <div className="hidden md:block">
        <PlanCard plan={plan} />
      </div>
      <div className="flex-1">
        <Image
          className="w-full max-h-[400px] object-cover rounded-[20px] mb-6"
          src="/home/souvenir/plageAftis.png"
          alt="Plan Image"
          width={200}
          height={400}
        />

        <div className="md:hidden">
          <PlanCard plan={plan} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
          <div>
            <h1 className="text-[var(--text)] text-3xl font-medium mb-3">
              Your Safety Matters
            </h1>
            <ul className="list-disc pl-5">
              <li>
                Bring your personal medication and be in good physical condition
              </li>
              <li>Follow instructions and wear proper protective gear </li>
            </ul>
          </div>
          <div className="md:self-end">
            <ul className="list-disc pl-5">
              <li>
                Bring your personal medication and be in good physical condition
              </li>
              <li>Follow instructions and wear proper protective gear </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 w-full flex justify-center flex-wrap gap-2">
          {["Accommodation", "Meals", "Facilities", "Support"].map((e, ind) => (
            <Button key={ind} variant={"outline"}>
              <Check className="mr-1 w-5" /> {e}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
