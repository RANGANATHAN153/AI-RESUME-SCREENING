
import { GoogleGenAI, Type } from "@google/genai";
import { Candidate } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeminiAnalysis = async (candidates: Candidate[]) => {
  // We send a subset or aggregate for context to avoid token limits
  const sample = candidates.slice(0, 100).map(c => ({
    role: c.JobRole,
    skills: c.Skills,
    exp: c.ExperienceYears,
    decision: c.RecruiterDecision,
    score: c.AIScore
  }));

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this hiring data: ${JSON.stringify(sample)}. Provide a deep data science analysis including trends in AI scores versus job roles, typical skills for successful hires, and overall market observations.`,
    config: {
      temperature: 0.7,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          topSkills: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["summary", "recommendations", "topSkills"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const predictDecision = async (candidate: Partial<Candidate>) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on your internal data science knowledge of high-performance technical teams, predict if a candidate with the following profile should be hired or rejected. Provide reasoning. 
    Profile: ${JSON.stringify(candidate)}`,
    config: {
      temperature: 0.2,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          decision: { type: Type.STRING, description: "Hire or Reject" },
          confidence: { type: Type.NUMBER },
          reasoning: { type: Type.STRING }
        },
        required: ["decision", "confidence", "reasoning"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
