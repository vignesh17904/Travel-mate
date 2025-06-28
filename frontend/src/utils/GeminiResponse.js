import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const chat = ai.chats.create({
  model: "gemini-2.0-flash",
});

export const GeminiResponse = async (obj) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a travel and accommodation expert. Answer questions about ${obj.placename} in under ${obj.words} words.
              User question: ${obj.question}`,
            },
          ],
        },
      ],
    });

    const output = response?.text || "No response.";
    return output.trim();
  } catch (error) {
    console.error("Error fetching summary:", error);
    return "No response.";
  }
};

const hotelListToText = (hotels = []) => {
  return hotels
    .map((hotel, index) => {
      return `Hotel ${index + 1}:
        Name: ${hotel.name}
        Description: ${hotel.description}
        Address: ${hotel.address}
        Location: Latitude ${hotel.location?.lat}, Longitude ${hotel.location?.lon}
        Price per night: ₹${hotel.pricePerNight}
        ---------------------------`;
    })
    .join("\n");
};

export const GeminiResponseH = async (obj, hotelList = []) => {
  try {
    const hotelsText = hotelListToText(hotelList);

    const promptText = `
You are a travel and accommodation expert. Use the following hotel data for ${obj.placename} if it's relevant to the user's question.
You may also use your own knowledge. Keep responses under ${obj.words} words unless the user asks for more. Feel free to ask follow-up questions or offer help.

Hotel data:
${hotelsText}

User question: ${obj.question}

If the hotel data is not relevant, answer using your own knowledge. Keep it concise and relevant.
Be prepared to answer questions about nearby transport and attractions. Use your own knowledge if hotel data is insufficient.
`;

    const response = await chat.sendMessage({
      message: promptText,
    });

    return response.text?.trim() || "No response.";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "No response.";
  }
};
