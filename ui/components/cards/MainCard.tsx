/** @format */

import React from 'react';
import Image from 'next/image';
import { Leaf } from 'lucide-react';
import { Plan } from '@/domain/plan';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface MainCardProps {
  plan: Plan;
  className?: string;
}

const MainCard: React.FC<MainCardProps> = ({ plan, className }) => {
  return (
    <Link href={`/plans/${plan.id}`}>
      <div className={cn("bg-[--background] shadow-md overflow-hidden border-2 border-[--input-border] flex flex-col md:flex-row rounded-3xl cursor-pointer", className)}>
        <div className="relative w-full h-48 md:h-auto md:w-2/5">
          <Image src="/home/carrousel/bejaia.jpg" alt={plan.name} layout="fill" objectFit="cover" />
        </div>
        <div className="w-full md:w-3/5 p-5 flex flex-col justify-between md:py-12">
          <div>
            <h3 className="font-bold text-xl mb-6 text-[--text]">Coastal Cleanup & Marine Awareness</h3>
            <p className="text-sm text-[--text-muted]">Bejaia, Mediterranean Coast</p>
            <p className="text-sm text-[--text-muted] mb-4">10 Aug - 25 Aug</p>
            <div className="flex items-center text-sm text-[--text-muted]">
              <Leaf size={16} className="mr-1.5" />
              <span>Environmental Protection</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="font-bold text-lg text-[--text]">Fees : 6,750 DZD</p>
            <button className="bg-[var(--secondary-color)] text-[--button-text-primary] px-8 py-2 rounded-lg hover:bg-green-700 font-semibold">
              Apply
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MainCard;
