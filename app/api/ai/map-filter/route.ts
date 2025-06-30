import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

interface MapMarker {
  position: [number, number];
  popupText: string;
}

// In a real application, this data would come from a database.
const locations: MapMarker[] = [
  // Major Cities
  { position: [36.775, 3.058], popupText: "Algiers - The Capital" },
  { position: [35.696, -0.633], popupText: "Oran - The Radiant City" },
  { position: [36.365, 6.613], popupText: "Constantine - City of Bridges" },
  { position: [36.903, 7.754], popupText: "Annaba - Coastal City" },
  
  // Other Wilayas
  { position: [36.76, 3.04], popupText: "Adrar" },
  { position: [36.07, 2.78], popupText: "Chlef" },
  { position: [34.88, 1.32], popupText: "Laghouat" },
  { position: [29.25, -2.88], popupText: "Oum El Bouaghi" },
  { position: [36.18, 5.41], popupText: "Batna" },
  { position: [36.76, 5.06], popupText: "Béjaïa" },
  { position: [34.42, 4.75], popupText: "Biskra" },
  { position: [29.27, 0.63], popupText: "Béchar" },
  { position: [36.27, 2.73], popupText: "Blida" },
  { position: [36.05, 4.08], popupText: "Bouira" },
  { position: [22.78, 5.52], popupText: "Tamanrasset" },
  { position: [35.40, 6.17], popupText: "Tébessa" },
  { position: [35.20, 1.32], popupText: "Tlemcen" },
  { position: [36.47, 2.45], popupText: "Tiaret" },
  { position: [36.71, 3.68], popupText: "Tizi Ouzou" },
  { position: [36.77, 3.06], popupText: "Alger" },
  { position: [36.50, 8.78], popupText: "Djelfa" },
  { position: [36.78, 5.76], popupText: "Jijel" },
  { position: [36.19, 5.41], popupText: "Sétif" },
  { position: [35.28, -1.50], popupText: "Saïda" },
  { position: [36.36, 6.61], popupText: "Skikda" },
  { position: [34.70, -1.32], popupText: "Sidi Bel Abbès" },
  { position: [36.90, 7.75], popupText: "Annaba" },
  { position: [36.35, 8.18], popupText: "Guelma" },
  { position: [36.36, 6.61], popupText: "Constantine" },
  { position: [36.26, 2.89], popupText: "Médéa" },
  { position: [35.80, 0.15], popupText: "Mostaganem" },
  { position: [35.03, 4.14], popupText: "M'Sila" },
  { position: [35.08, 0.64], popupText: "Mascara" },
  { position: [32.36, 6.07], popupText: "Ouargla" },
  { position: [35.70, -0.63], popupText: "Oran" },
  { position: [33.36, 2.22], popupText: "El Bayadh" },
  { position: [27.87, -0.99], popupText: "Illizi" },
  { position: [36.07, 5.95], popupText: "Bordj Bou Arreridj" },
  { position: [36.56, 3.88], popupText: "Boumerdès" },
  { position: [35.39, 8.12], popupText: "El Tarf" },
  { position: [27.22, -2.18], popupText: "Tindouf" },
  { position: [35.65, 1.83], popupText: "Tissemsilt" },
  { position: [33.51, 6.87], popupText: "El Oued" },
  { position: [34.85, 7.42], popupText: "Khenchela" },
  { position: [35.78, 7.73], popupText: "Souk Ahras" },
  { position: [36.47, 2.45], popupText: "Tipaza" },
  { position: [36.02, 5.06], popupText: "Mila" },
  { position: [36.17, 1.25], popupText: "Aïn Defla" },
  { position: [33.78, -0.15], popupText: "Naâma" },
  { position: [35.73, 1.34], popupText: "Aïn Témouchent" },
  { position: [31.96, 2.87], popupText: "Ghardaïa" },
  { position: [35.87, 0.14], popupText: "Relizane" },
];


export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are an AI assistant for a map of Algeria. Your task is to act as a filter. Analyze the user's query: "${query}". Respond with a JSON array of objects from the following list that best match the query. The list of available locations is: ${JSON.stringify(locations)}. Only return a valid JSON array of objects from the list. If no locations match, return an empty array.`,
    });

    const result = await model.generateContent(""); // Sending an empty prompt as the query is in the system instruction
    const response = result.response;
    const text = response.text().replace(/```json|```/g, "").trim();

    // Basic validation to ensure response is valid JSON
    try {
        JSON.parse(text);
        return new NextResponse(text, { headers: { "Content-Type": "application/json" }});
    } catch(e) {
        console.error("Gemini did not return valid JSON:", text);
        return NextResponse.json([]); // Return empty array if AI fails
    }

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