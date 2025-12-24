import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, InterviewData, Difficulty } from "../types";

// Fix: Strictly follow initialization guidelines for GoogleGenAI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateInterviewContent(profile: UserProfile): Promise<InterviewData> {
  const prompt = `Generate a realistic set of interview questions for a ${profile.jobRole} position.
  Experience Level: ${profile.experienceLevel}
  Key Skills: ${profile.skills.join(', ')}
  Difficulty Target: ${profile.preferredDifficulty}

  Requirements:
  1. Provide exactly 8 questions across categories: Technical, Problem-Solving, Scenario-Based, Behavioral, and HR.
  2. For each question, include detailed "expected key points" and a "short sample ideal answer".
  3. Include a mix of difficulty levels (Easy, Medium, Hard) regardless of the target if Mixed is selected, or lean towards the target.
  4. Provide a professional feedback summary based on the profile provided.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                category: { type: Type.STRING },
                difficulty: { type: Type.STRING },
                question: { type: Type.STRING },
                expectedKeyPoints: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                sampleAnswer: { type: Type.STRING }
              },
              required: ["id", "category", "difficulty", "question", "expectedKeyPoints", "sampleAnswer"]
            }
          },
          summary: {
            type: Type.OBJECT,
            properties: {
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              improvementAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
              readinessScore: { type: Type.NUMBER },
              overallFeedback: { type: Type.STRING }
            },
            required: ["strengths", "improvementAreas", "readinessScore", "overallFeedback"]
          }
        },
        required: ["questions", "summary"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as InterviewData;
}