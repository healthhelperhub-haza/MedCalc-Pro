
import { GoogleGenAI } from "@google/genai";
import { CALCULATORS } from "../constants.tsx";

export const getClinicalAdvice = async (query: string) => {
  // Always initialize with named parameter apiKey
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const calculatorContext = CALCULATORS.map(c => `- ${c.name} (${c.shortName}): ${c.description}`).join('\n');

  // Direct call to generateContent with model name and prompt string
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are a clinical assistant for a hospital app. 
    The user is asking about a medical calculation or a clinical case.
    Based on the available tools listed below, suggest the most appropriate calculation and explain why.
    
    Tools Available:
    ${calculatorContext}
    
    User Query: "${query}"
    
    Provide a concise, professional answer. Suggest exactly which tool from the list above should be used.`,
    config: {
      temperature: 0.7,
      // If maxOutputTokens is set, thinkingBudget must also be set for Gemini 3 series models
      maxOutputTokens: 500,
      thinkingConfig: { thinkingBudget: 100 },
    }
  });

  // Extract generated text from the response object
  return response.text;
};
