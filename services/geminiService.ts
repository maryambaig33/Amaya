import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from "../constants";

// Initialize Gemini
// NOTE: We safely check for process.env to avoid runtime crashes in environments 
// that might not have it strictly defined at runtime.
const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

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
    
    // We create a chat-like experience using generateContent with system instructions
    // For a full chat history, we would maintain a ChatSession, but for this simple 
    // demo component we'll treat it as single-turn context-aware for simplicity, 
    // or we could assume the component manages history and sends it.
    // Here we will use a simple generation for the immediate response.
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I'm having trouble smelling the coffee beans right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently taking a coffee break. Please check your API key or try again later.";
  }
};