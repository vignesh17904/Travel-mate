import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

export const geminiresponse = async (obj) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents:
          `You are a travel and accomodation expert. give answer about ${obj.placename} for the question "${obj.question}"in not more than ${obj.words} words` 
      });
      console.log("response",response);
      console.log("response text",  response.text);
      const output = response?.text || "No response.";
      return output.trim();
    } 
    catch (error) {
      console.error("Error fetching summary:", error);
      return "No response.";
    } 
  };

// const sampleresponse = await geminiresponse({
//   placename: "Eiffel Tower",
//   question: "What is this place about?",
// });
// console.log("Sample response:", sampleresponse);