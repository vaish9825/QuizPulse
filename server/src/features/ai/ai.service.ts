import { GoogleGenAI } from "@google/genai";

import type { GenerateQuizRequest } from "./ai.types.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateQuiz(
  payload: GenerateQuizRequest
) {
  const prompt = `
You are an expert quiz generator.

Generate a quiz on the topic:
"${payload.topic}"

Difficulty:
${payload.difficulty}

Generate exactly ${payload.questions} questions.

Return ONLY valid JSON.

Use this schema exactly:

{
  "title": "string",
  "description": "string",
  "difficulty": "easy | medium | hard",
  "questions": [
    {
      "question": "string",
      "options": [
        "option1",
        "option2",
        "option3",
        "option4"
      ],
      "correctAnswer": 0,
      "timeLimit": 20,
      "points": 100
    }
  ]
}

Rules:

- Exactly four options.
- correctAnswer must be the index (0-3).
- No markdown.
- No explanation.
- No extra text.
- Output ONLY JSON.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  const text =
    response.text ?? "";

  return JSON.parse(text);
}