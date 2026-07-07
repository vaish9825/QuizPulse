import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

import { useCreateQuiz } from "../hooks/useCreateQuiz";
import {
  createQuizSchema,
  type CreateQuizSchema,
} from "../schemas/createQuiz.schema";

export default function QuizForm() {
  const navigate = useNavigate();

  const createQuiz = useCreateQuiz();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateQuizSchema>({
    resolver: zodResolver(createQuizSchema),

    defaultValues: {
      title: "",
      description: "",
      difficulty: "easy",
      createdBy: "Vaishnavi",

      questions: [
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  async function onSubmit(data: CreateQuizSchema) {
    try {
      await createQuiz.mutateAsync(data);

      reset();

      navigate("/");
    } catch (error) {
      console.error(error);

    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-xl bg-slate-900 p-8"
    >
      {/* Quiz Details */}

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
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <hr className="border-slate-700" />

      {/* Questions */}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-4 rounded-xl border border-slate-700 p-6"
        >
          <h2 className="text-xl font-semibold text-white">
            Question {index + 1}
          </h2>

          <Input
            placeholder="Question"
            {...register(`questions.${index}.question`)}
          />

          {[0, 1, 2, 3].map((option) => (
            <Input
              key={option}
              placeholder={`Option ${option + 1}`}
              {...register(`questions.${index}.options.${option}`)}
            />
          ))}

          <select
            {...register(`questions.${index}.correctAnswer`, {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
          >
            <option value={0}>Option 1</option>
            <option value={1}>Option 2</option>
            <option value={2}>Option 3</option>
            <option value={3}>Option 4</option>
          </select>

          {fields.length > 1 && (
            <Button
              type="button"
              variant="danger"
              onClick={() => remove(index)}
            >
              Remove Question
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          append({
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0,
          })
        }
      >
        + Add Question
      </Button>

      <Button
        type="submit"
        disabled={isSubmitting || createQuiz.isPending}
      >
        {createQuiz.isPending ? "Saving..." : "Save Quiz"}
      </Button>
    </form>
  );
}