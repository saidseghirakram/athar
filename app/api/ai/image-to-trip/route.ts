import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Helper function to convert a file to a base64 string
async function fileToGenerativePart(file: File) {
  const fileBuffer = await file.arrayBuffer();
  const base64String = Buffer.from(fileBuffer).toString("base64");
  return {
    inlineData: {
      data: base64String,
      mimeType: file.type,
    },
  };
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    const prompt = formData.get("prompt") as string | null;

    if (!image || !prompt) {
      return NextResponse.json(
        { error: "Image and prompt are required." },
        { status: 400 }
      );
    }

    const imagePart = await fileToGenerativePart(image);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are Dahman, an expert AI tour guide for Algeria. A user has uploaded an image and a text prompt. Analyze the image to understand its key features (e.g., 'sandy beach with clear water', 'ancient Roman ruins', 'bustling city street'). Then, using the user's prompt and your analysis, suggest specific, named destinations in Algeria that match the image's vibe and location type. Provide practical details and be enthusiastic.",
    });

    const result = await model.generateContent([prompt, imagePart]);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error("Detailed Error calling Gemini API:", error);
    return NextResponse.json(
      {
        error: "Failed to get response from AI.",
        details:
          error.message || "An unknown error occurred. Check server logs.",
      },
      { status: 500 }
    );
  }
} 