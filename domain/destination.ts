/** @format */

import { Position } from "./location";

export interface Destination {
  id: string;
  name: string;
  description: string;
  location: Position;
  createdAt?: string;
  updatedAt?: string;
}
