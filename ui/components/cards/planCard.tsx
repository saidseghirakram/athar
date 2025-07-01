/** @format */

import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import { ApplyGuidDialog } from "../dialog/AppyGuidDialog";
import { Plan } from "@/domain/plan";
import { useState } from 'react';
import Cookies from 'js-cookie';

const styleDate = (startDate: Date, endDate: Date): string => {
  const format = (date: Date) =>
    date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return `${format(startDate)} - ${format(endDate)}`;
};

const PlanCard = ({ plan }: { plan: Plan }) => {
  const [applyResult, setApplyResult] = useState<string | null>(null);
  // Get user id from localStorage as 'id' (not 'userId')
  const userId = typeof window !== 'undefined' ? localStorage.getItem('id') || '' : '';

  const handleApply = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiUrl = baseUrl ? baseUrl + '/plan/apply' : '/plan/apply';
    const payload = { userId, planId: plan.id };
    // Get token from cookies at runtime
    const token = Cookies.get('token');
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setApplyResult('Application successful!');
      } else {
        setApplyResult(data.message || 'Application failed.');
      }
    } catch (err) {
      setApplyResult('Network or server error.');
    }
  };

  return (
    <div className="w-full h-auto md:max-w-96 grid space-y-6">
      <div className="px-2.5 py-6 rounded-[20px] border  border-black">
        <h1 className="text-[var(--text)] text-3xl font-bold mb-1">
          {plan.name}
        </h1>
        <p className="font-light mb-2.5">{plan.description}</p>
        <span>{styleDate(plan.startDate, plan.endDate)}</span>
      </div>
      <div className="rounded-[20px] border border-black px-1.5 py-4 flex justify-center items-center gap-x-4">
        <Sprout />
        Environmental Protection
      </div>
      <div className="rounded-[20px] border border-black px-5 py-4 space-y-[28px]">
        <h1 className="text-[var(--text)] text-3xl font-bold">Fees</h1>
        {plan.fees.map((e: { id: string; name: string; fees: string }) => (
          <div key={e.id} className="flex justify-between">
            <span>{e.name}</span>
            <span>{e.fees}</span>
          </div>
        ))}
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>
            {plan.fees.reduce((t: number, e: { fees: string }) => t + Number(e.fees), 0)}
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        <Button variant="whitePrimaryBg" onClick={handleApply}> Apply</Button>
        {applyResult && (
          <div className={`mt-2 px-3 py-1 rounded text-center text-sm ${applyResult.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {applyResult}
          </div>
        )}
        <ApplyGuidDialog />
      </div>
    </div>
  );
};

export default PlanCard;