import { api } from "@/lib/api";

export async function generatePdfQuiz(

  payload: {

    file: File;

    difficulty: "easy" | "medium" | "hard";

    questions: number;

  }

) {

  const formData = new FormData();



  formData.append("pdf", payload.file);

  formData.append(

    "difficulty",

    payload.difficulty

  );

  formData.append(

    "questions",

    String(payload.questions)

  );

const { data } = await api.post(
  "/pdf/generate",

    formData,

    {

      headers: {

        "Content-Type":

          "multipart/form-data",

      },

    }

  );



  return data.quiz;

}