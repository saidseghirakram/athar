/** @format */

import { Destination } from "./destination";
import { Fees } from "./fees";

export interface Plan {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  volunteerNumber: number;
  appliedVolunteerNumber: number;
  isActive: boolean;
  isPaid: boolean;
  totalFees: string;
  destination: Destination;
  category_id: string;
  createdAt?: string;
  updatedAt?: string;
  fees: Fees[];
}
