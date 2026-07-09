import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Card } from "@/shared/components/ui/Card";

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

  const { fields, append, remove } =
    useFieldArray({
      control,
      name: "questions",
    });

  async function onSubmit(
    data: CreateQuizSchema
  ) {
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
      className="space-y-10"
    >
      {/* Quiz Details */}

      <Card>

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-slate-900">
            Quiz Details
          </h2>

          <p className="mt-2 text-slate-600">
            Fill in the basic information
            about your quiz.
          </p>

        </div>

        <div className="space-y-6">

          <Input
            placeholder="Quiz Title"
            {...register("title")}
          />

          <Input
            placeholder="Description"
            {...register(
              "description"
            )}
          />

          <Input
            placeholder="Created By"
            {...register(
              "createdBy"
            )}
          />

          <select
            {...register(
              "difficulty"
            )}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-blue-500 focus:outline-none"
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

        </div>

      </Card>

      {/* Questions */}

      {fields.map(
        (field, index) => (
          <Card
            key={field.id}
          >
            <div className="mb-8 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-slate-900">
                Question {index + 1}
              </h2>

              {fields.length >
                1 && (
                <Button
                  type="button"
                  variant="danger"
                  onClick={() =>
                    remove(index)
                  }
                >
                  Remove
                </Button>
              )}

            </div>

            <div className="space-y-5">

              <Input
                placeholder="Question"
                {...register(
                  `questions.${index}.question`
                )}
              />

              {[0, 1, 2, 3].map(
                (option) => (
                  <Input
                    key={
                      option
                    }
                    placeholder={`Option ${
                      option +
                      1
                    }`}
                    {...register(
                      `questions.${index}.options.${option}`
                    )}
                  />
                )
              )}

              <select
                {...register(
                  `questions.${index}.correctAnswer`,
                  {
                    valueAsNumber: true,
                  }
                )}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-blue-500 focus:outline-none"
              >
                <option value={0}>
                  Correct Answer
                  : Option 1
                </option>

                <option value={1}>
                  Correct Answer
                  : Option 2
                </option>

                <option value={2}>
                  Correct Answer
                  : Option 3
                </option>

                <option value={3}>
                  Correct Answer
                  : Option 4
                </option>

              </select>

            </div>

          </Card>
        )
      )}

      {/* Bottom Buttons */}

      <div className="flex flex-wrap justify-between gap-4">

        <Button
          type="button"
          variant="outline"
          className="rounded-full px-8"
          onClick={() =>
            append({
              question: "",
              options: [
                "",
                "",
                "",
                "",
              ],
              correctAnswer: 0,
            })
          }
        >
          + Add Question
        </Button>

        <Button
          type="submit"
          className="rounded-full px-10"
          disabled={
            isSubmitting ||
            createQuiz.isPending
          }
        >
          {createQuiz.isPending
            ? "Publishing..."
            : "Publish Quiz"}
        </Button>

      </div>

    </form>
  );
}