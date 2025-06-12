import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({apiKey:import.meta.env.VITE_GEMINI_API_KEY});

export const GeminiResponse = async (obj) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents:
          `You are a travel and accomodation expert. give answer about ${obj.placename} for the question "${obj.question}"in not more than ${obj.words} words` 
      });
      const output = response?.text || "No response.";
      return output.trim();
    } 
    catch (error) {
      console.error("Error fetching summary:", error);
      return "No response.";
    } 
  };

