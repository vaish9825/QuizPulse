import { useState } from "react";

const faqs = [
  {
    question: "How do I create a quiz?",
    answer:
      "Create a quiz, add questions and start a room in seconds.",
  },
  {
    question: "Can players join without an account?",
    answer:
      "Yes. Players only need a room code and nickname.",
  },
  {
    question: "Does QuizPulse work on mobile?",
    answer:
      "Yes. QuizPulse is fully responsive across all devices.",
  },
  {
    question: "How many players can join?",
    answer:
      "Multiple participants can join the same room simultaneously.",
  },
  {
    question: "Is AI quiz generation available?",
    answer:
      "Coming soon. You'll be able to generate quizzes from any topic using AI.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-8"
    >
      <div className="mx-auto max-w-4xl">

        <div className="mb-12 text-center">

          <h2 className="text-5xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about QuizPulse.
          </p>

        </div>

        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >

              <button
                onClick={() =>
                  setOpen(
                    open === index
                      ? null
                      : index
                  )
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </span>

                <span className="text-2xl text-blue-600">
                  {open === index ? "−" : "+"}
                </span>

              </button>

              {open === index && (
                <div className="px-6 pb-6">
                  <p className="leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}