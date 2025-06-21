import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

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

    const prompt = [
      {
        role: "user",
        parts: [
          {
            text: `You are a travel and accommodation expert. Use the following hotel data for ${obj.placename} if it's relevant to the user's question.
            You may also use your own knowledge. Keep responses under ${obj.words} words unless the user asks for more. Feel free to ask follow-up questions or offer help.

            Hotel data:
            ${hotelsText}
            search hotel names and addresses in the hotel data above.

            User question: ${obj.question}
            If the hotel data is not relevant, please answer the question using your own knowledge. If the user asks for more information, you can provide it, but keep it concise and relevant to the question asked.
            be prepared to answer questions related to distance from nearest bustand, airport, railway station, and other nearby tourist attractions.
            feel free to use your own knowledge if the hotel data is not relevant.and everything you know to answer the question if data is not sufficient`,
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const output = response?.text || "No response.";
    return output.trim();
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "No response.";
  }
};
