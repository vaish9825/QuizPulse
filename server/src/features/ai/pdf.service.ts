import { GoogleGenAI } from "@google/genai";

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

  throw new Error("Unable to generate quiz from PDF.");
}

export async function generateQuizFromPdf(
  text: string,
  difficulty: string,
  questions: number
) {
  const prompt = `
You are an expert quiz generator.

Using ONLY the study material below, generate a multiple-choice quiz.

Study Material:
${text.substring(0, 25000)}

Generate exactly ${questions} questions.

Difficulty:
${difficulty}

Return ONLY valid JSON.

Use this schema exactly:

{
  "title": "string",
  "description": "string",
  "difficulty": "${difficulty}",
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

- Use ONLY information from the PDF.
- Exactly four options.
- correctAnswer must be an integer between 0 and 3.
- Do not include explanations.
- Do not include markdown.
- Do not wrap the JSON inside \`\`\`.
- Return ONLY JSON.
`;

  const response = await generateWithRetry(prompt);

  let result = response.text ?? "";

  result = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  console.log(result);

  try {
    return JSON.parse(result);
  } catch {
    throw new Error(
      "Gemini returned an invalid JSON response."
    );
  }
}