/** @format */
"use server";

import { jsonResponse } from "@/api/utils/jsonResponse";
import sendEmail from "@/api/utils/sendEmail";
import contactValidator from "@/api/zodValidators/contactValidator";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, content } = body;

    const validator = contactValidator({
      name,
      email,
      subject,
      content,
    });

    if (!validator.success) {
      return jsonResponse({
        status: 400,
        message: "Validation failed",
        errors: validator.errors!,
      });
    }

    const contactProps = validator.data!;
    try {
      await sendEmail(contactProps);
    } catch (e) {
      console.error(e);
      return jsonResponse({
        status: 400,
        message: "failed to send email",
      });
    }

    return jsonResponse({
      status: 200,
      message: "Email Send Successfully",
      data: validator.data,
    });
  } catch (err) {
    console.error(err);
    return jsonResponse({
      status: 500,
      message: "Internal server error",
    });
  }
}
