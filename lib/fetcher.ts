import { ApiResponse } from "@/domain/apiResponse";
import Cookies from "js-cookie";

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
): Promise<{
  success: true;
  data: T;
} | {
  success: false;
  errors?: any;
}> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      let errorMsg = null;
      if (Array.isArray(json?.errors) && json.errors.length > 0 && json.errors[0].message) {
        errorMsg = json.errors[0].message;
      } else if (json?.error) {
        errorMsg = json.error;
      } else if (json?.message) {
        errorMsg = json.message;
      } else if (json?.errors && typeof json.errors === "string") {
        errorMsg = json.errors;
      } else if (json?.errors && typeof json.errors === "object") {
        errorMsg = json.errors.general?.[0];
      }

      return {
        success: false,
        errors: errorMsg || { general: [`API error: ${res.status}`] },
      };
    }

    // ✅ Save token to cookies
    const token = json?.data?.token;
    if (token) {
      Cookies.set("token", token, {
        expires: 7, // in days
        path: "/",
        secure: true,
        sameSite: "Strict",
      });
      console.log("✅ Token saved in cookies:", token);
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
