/** @format */

import React from 'react';
import Image from 'next/image';
import { Leaf } from 'lucide-react';
import { Plan } from '@/domain/plan';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MainCardProps {
  plan: Plan;
  className?: string;
}

const MainCard: React.FC<MainCardProps> = ({ plan, className }) => {
  const router = useRouter();
  // Format dates
  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  };
  const start = formatDate(plan.startDate);
  const end = formatDate(plan.endDate);
  // Calculate total fees (if not provided as a string)
  const totalFees = plan.totalFees || plan.fees?.reduce((sum, f) => sum + Number(f.fees), 0) || 0;
  // Get destination name
  const destination = plan.destination?.name || '';
  // Get category (fallback to id if no name)
  const category = plan.category_id || '';

  return (
    <Link href={`/plans/${plan.id}`}>
      <div className={cn("bg-[--background] shadow-md overflow-hidden border-2 border-[--input-border] flex flex-col md:flex-row rounded-3xl cursor-pointer", className)}>
        <div className="relative w-full h-48 md:h-auto md:w-2/5">
          <Image src="/home/carrousel/bejaia.jpg" alt={plan.name} layout="fill" objectFit="cover" />
        </div>
        <div className="w-full md:w-3/5 p-5 flex flex-col justify-between md:py-12">
          <div>
            <h3 className="font-bold text-xl mb-6 text-[--text]">{plan.name}</h3>
            <p className="text-sm text-[--text-muted]">{destination}</p>
            <p className="text-sm text-[--text-muted] mb-4">{start} - {end}</p>
            <div className="flex items-center text-sm text-[--text-muted]">
              <Leaf size={16} className="mr-1.5" />
              <span>{category}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="font-bold text-lg text-[--text]">Fees : {totalFees} DZD</p>
            <button
              className="bg-[var(--secondary-color)] text-[--button-text-primary] px-8 py-2 rounded-lg hover:bg-green-700 font-semibold"
              onClick={() => router.push(`/plans/${plan.id}`)}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MainCard;
