/** @format */

import * as z from "zod";

const nameSubjectRegex = /^[A-Za-z\s]+$/;

const validator = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100)
    .regex(nameSubjectRegex, "Name must only contain letters and spaces"),

  email: z.string().email("Invalid email address"),

  subject: z
    .string()
    .min(1, "Subject is required")
    .max(150)
    .regex(nameSubjectRegex, "Subject must only contain letters and spaces"),

  content: z.string().min(1, "Message content is required").max(1000),
});

interface ContactValidatorReturn {
  success: boolean;
  data?: ContactProps;
  errors?: { [key: string]: string[] };
}
function contactValidator(contactProps: {
  name: any;
  email: any;
  subject: any;
  content: any;
}): ContactValidatorReturn {
  const validationResult = validator.safeParse(contactProps);

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    data: validationResult.data,
  };
}

export default contactValidator;
