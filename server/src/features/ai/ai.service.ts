import { GoogleGenAI } from "@google/genai";

import type { GenerateQuizRequest } from "./ai.types.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

async function generateWithRetry(prompt: string) {
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      });
    } catch (err: any) {
      if (err.status === 503 && attempt < maxRetries) {

        await new Promise((resolve) =>
          setTimeout(resolve, attempt * 3000)
        );

        continue;
      }

      throw err;
    }
  }

  throw new Error("Unable to generate quiz.");
}

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
- correctAnswer must be an integer between 0 and 3.
- Keep questions concise.
- Keep options concise.
- Return ONLY valid JSON.
- Do not wrap JSON inside markdown.
`;

  const response = await generateWithRetry(prompt);

  let text = response.text ?? "";

  // Gemini sometimes returns JSON inside markdown fences.
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  console.log(text);

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      "Gemini returned an invalid JSON response."
    );
  }
}