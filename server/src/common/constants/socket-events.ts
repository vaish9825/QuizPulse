export const SOCKET_EVENTS = {
  // Room
  JOIN_ROOM: "join-room",
  PARTICIPANTS_UPDATED: "participants-updated",

  // Game
  START_QUIZ: "start-quiz",
  QUIZ_STARTED: "quiz-started",

  SUBMIT_ANSWER: "submit-answer",
  ANSWER_RECEIVED: "answer-received",

  LEADERBOARD_UPDATED: "leaderboard-updated",

  NEXT_QUESTION: "next-question",
  QUESTION_ENDED: "question-ended",

  QUIZ_FINISHED: "quiz-finished",

  // Errors
  QUIZ_ERROR: "quiz-error",
} as const;