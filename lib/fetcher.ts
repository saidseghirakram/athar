/** @format */

import { ApiResponse } from "@/domain/apiResponse";

// lib/fetcher.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetcher<T>(url: string): Promise<T> {
  if (!BASE_URL) {
    throw new Error(`Base URl not found`);
  }
  const res = await fetch(`${BASE_URL}${url}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const json: ApiResponse<T> = await res.json();

  if (json.errors) {
    const error = new Error("API returned errors");
    (error as any).details = json.errors;
    throw error;
  }

  return json.data as T;
}


export async function poster<T, B = any>(
  url: string,
  body: B
): Promise<{ success: true; data: T } | { success: false; errors?: any }> {
  if (!BASE_URL) {
    throw new Error(`Base URL not found`);
  }

  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json: ApiResponse<T> = await res.json();

    if (!res.ok || json.errors) {
      return {
        success: false,
        errors: json.errors || { general: [`API error: ${res.status}`] },
      };
    }

    return {
      success: true,
      data: json.data as T,
    };
  } catch (error: any) {
    return {
      success: false,
      errors: error?.details || { general: [error.message || "Unknown error"] },
    };
  }
}
