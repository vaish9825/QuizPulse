import { useState } from "react";

const faqs = [
  {
    question: "How do I create a quiz?",
    answer:
      "QuizPulse lets you create quizzes manually or generate them instantly using AI. You can either enter a topic with your preferred difficulty level or upload a PDF containing study material.",
  },
  {
    question: "Can I generate quizzes using AI?",
    answer:
      "Yes. AI can generate high-quality multiple-choice quizzes from any topic or directly from uploaded PDF notes. Simply choose the difficulty level and number of questions.",
  },
  {
    question: "Do participants need an account?",
    answer:
      "No. Players can join instantly using a room code and nickname. No registration or login is required.",
  },
  {
    question: "How does live gameplay work?",
    answer:
      "Once the host starts the quiz, every participant receives questions simultaneously. Scores are calculated instantly and the live leaderboard updates after every round.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "Currently QuizPulse supports PDF documents for AI quiz generation. Upload lecture notes, study guides or reference material to automatically create quizzes.",
  },
  {
    question: "Can I host quizzes in real time?",
    answer:
      "Yes. After creating a quiz, click 'Start Live' to generate a room code. Participants can join immediately and the host controls the flow of the quiz.",
  },
  {
    question: "Can I create quizzes without AI?",
    answer:
      "Absolutely. QuizPulse includes a complete manual quiz editor where you can add custom questions, answers, timers and point values.",
  },
  {
    question: "Which devices are supported?",
    answer:
      "QuizPulse works on modern desktops, tablets and mobile devices. Participants only need a browser and the room code to join.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-20"
    >
      <div className="mx-auto max-w-4xl">

        <div className="mb-12 text-center">

          <h2 className="text-5xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about creating,
            hosting and playing quizzes with QuizPulse.
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
                  setOpenIndex(
                    openIndex === index
                      ? null
                      : index
                  )
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >

                <span className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </span>

                <span className="text-2xl text-blue-600">
                  {openIndex === index
                    ? "−"
                    : "+"}
                </span>

              </button>

              {openIndex === index && (
                <div className="border-t border-slate-100 px-6 py-5 leading-7 text-slate-600">
                  {faq.answer}
                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}