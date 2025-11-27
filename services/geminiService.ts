import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from "../constants";

// Initialize Gemini
// We access process.env.API_KEY directly as it is guaranteed to be available in this environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "Amaya Coffee Sommelier", an expert coffee concierge for Amaya Coffee.
Your goal is to help customers find the perfect coffee bean from our catalog based on their taste preferences.
Be warm, inviting, and sophisticated, like a barista at a high-end specialty shop.

Here is our current product catalog:
${JSON.stringify(PRODUCTS.map(p => ({
  name: p.name,
  roast: p.roastLevel,
  notes: p.tastingNotes,
  desc: p.description
})))}

Rules:
1. ONLY recommend products from our catalog.
2. If the user asks about brewing methods (V60, French Press, Espresso), give brief expert advice.
3. Keep responses concise (under 100 words) but helpful.
4. If a user is unsure, ask them about what flavors they like (fruity, chocolatey, nutty) or how they brew their coffee.
`;

export const getCoffeeRecommendation = async (userMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I'm having trouble retrieving the tasting notes right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently taking a short coffee break. Please check back in a moment.";
  }
};
