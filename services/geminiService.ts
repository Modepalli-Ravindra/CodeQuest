import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const askAiTutor = async (question: string, context: string): Promise<string> => {
  const client = getClient();
  if (!client) return "I need my API key to help you! Please check the configuration.";

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a friendly, encouraging coding tutor for a 10-year-old child. 
      The child is learning about: ${context}.
      The child asks: "${question}".
      
      Keep the answer short (under 50 words), fun, and simple. Use emojis.`,
    });
    
    return response.text || "I'm thinking... try asking again!";
  } catch (error) {
    console.error("AI Error:", error);
    return "Oops! My brain is fuzzy right now. Try again later.";
  }
};