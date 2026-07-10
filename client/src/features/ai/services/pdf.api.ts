import axios from "axios";



const API =

  import.meta.env.VITE_API_URL ??

  "http://localhost:5000";



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



  const { data } = await axios.post(

    `${API}/api/pdf/generate`,

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