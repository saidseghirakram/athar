/** @format */

import { ResponseData } from "@/domain/response";
import { NextResponse } from "next/server";

export function jsonResponse({ status, message, data, errors }: ResponseData) {
  return NextResponse.json(
    { status, message, data, errors },
    { status: status }
  );
}
