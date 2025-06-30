import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!messages) {
    return NextResponse.json(
      { error: "No messages provided" },
      { status: 400 }
    );
  }
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are Dahman, an expert Algerian tour guide. When asked for recommendations for any city, you MUST provide at least three specific, named suggestions. If your internal knowledge is limited, you must follow this procedure: 1. Identify the city's main square and refer to it, for example, as 'Place des Martyrs' or 'Central Square'. 2. Mention the main historical mosque, giving it a name like 'the Grand Mosque of Medea'. 3. Suggest a well-known local landmark or a beautiful natural spot, like 'the ancient Bab El Kouas gate' or 'the Benchicao gardens'. NEVER refuse to answer. You must act as a confident local expert and provide these types of specific examples.",
    });

    // Transform the message history to the format expected by the Gemini API
    const history = messages.slice(0, -1).map((msg: { role: string, content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      role: "assistant",
      content: text,
    });
  } catch (error: any) {
    console.error("Detailed Error calling Gemini API:", error);
    return NextResponse.json(
      {
        error: "Failed to get response from AI.",
        details: error.message || "An unknown error occurred. Please check the server logs.",
      },
      { status: 500 }
    );
  }
} 