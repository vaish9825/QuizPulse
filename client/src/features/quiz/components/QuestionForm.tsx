import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

import {
  createQuizSchema,
  type CreateQuizSchema,
} from "../schemas/createQuiz.schema";

export default function QuizForm() {
  const {
    register,
    handleSubmit,
  } = useForm<CreateQuizSchema>({
    resolver: zodResolver(createQuizSchema),

    defaultValues: {
      title: "",
      description: "",
      difficulty: "easy",
      createdBy: "Vaishnavi",
      questions: [],
    },
  });

  function onSubmit(data: CreateQuizSchema) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl bg-slate-900 p-8"
    >
      <Input
        placeholder="Quiz Title"
        {...register("title")}
      />

      <Input
        placeholder="Description"
        {...register("description")}
      />

      <Input
        placeholder="Created By"
        {...register("createdBy")}
      />

      <select
        {...register("difficulty")}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
      >
        <option value="easy">
          Easy
        </option>

        <option value="medium">
          Medium
        </option>

        <option value="hard">
          Hard
        </option>
      </select>

      <Button type="submit">
        Continue →
      </Button>
    </form>
  );
}