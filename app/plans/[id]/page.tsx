/** @format */
"use client";
import Spinner from "@/ui/shared/Spinner";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PlanCard from "@/ui/components/cards/planCard";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: plan, error, isLoading } = useSWR(`/guest/plans/${id}`, fetcher);

  if (isLoading) return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
  if (error) return <div>failed to load</div>;
  if (!plan) return <div>No plan found</div>;

  // Only pass props that exist to PlanCard, otherwise render details inline
  const planAny = plan as any;
  const planForCard = {
    ...planAny,
    startDate: planAny.startDate ? new Date(planAny.startDate) : undefined,
    endDate: planAny.endDate ? new Date(planAny.endDate) : undefined,
  };
  const canUsePlanCard = planAny.name && planAny.description && planAny.startDate && planAny.endDate;

  return (
    <div className="flex flex-col md:flex-row gap-4 py-28 px-5 md:px-8 min-h-screen">
      <div className="hidden md:block">
        {canUsePlanCard ? (
          <PlanCard plan={planForCard} />
        ) : (
          <div className="p-6 border rounded-xl bg-white shadow">
            {planAny.name && <h1 className="text-3xl font-bold mb-2">{planAny.name}</h1>}
            {planAny.description && <p className="mb-2">{planAny.description}</p>}
            {(planAny.startDate || planAny.endDate) && (
              <p className="mb-2">
                {planAny.startDate && <span><strong>Start:</strong> {new Date(planAny.startDate).toLocaleDateString()}</span>}
                {planAny.endDate && <span> <strong>End:</strong> {new Date(planAny.endDate).toLocaleDateString()}</span>}
              </p>
            )}
            {planAny.category_id && <p className="mb-2"><strong>Category:</strong> {planAny.category_id}</p>}
            {planAny.isActive !== undefined && <p className="mb-2"><strong>Active:</strong> {planAny.isActive ? "Yes" : "No"}</p>}
            {planAny.volunteerNumber !== undefined && <p className="mb-2"><strong>Volunteer Number:</strong> {planAny.volunteerNumber}</p>}
            {planAny.destinationId && <p className="mb-2"><strong>Destination ID:</strong> {planAny.destinationId}</p>}
            {planAny.associationId && <p className="mb-2"><strong>Association ID:</strong> {planAny.associationId}</p>}
            {planAny.createdAt && <p className="mb-2"><strong>Created At:</strong> {new Date(planAny.createdAt).toLocaleString()}</p>}
            {planAny.updatedAt && <p className="mb-2"><strong>Updated At:</strong> {new Date(planAny.updatedAt).toLocaleString()}</p>}
          </div>
        )}
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
          {canUsePlanCard ? (
            <PlanCard plan={planForCard} />
          ) : null}
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
