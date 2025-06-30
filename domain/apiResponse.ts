/** @format */

export interface ApiResponse<T = any> {
  data: T | null;
  errors?: {
    [key: string]: string[];
  }[];
}