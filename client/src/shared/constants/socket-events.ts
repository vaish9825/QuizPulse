export const SOCKET_EVENTS = {
  CONNECT: "connect",

  // Room
  JOIN_ROOM: "join-room",
  PARTICIPANTS_UPDATED: "participants-updated",

  // Quiz
  START_QUIZ: "start-quiz",
  QUIZ_STARTED: "quiz-started",

  // Game
  SUBMIT_ANSWER: "submit-answer",

  NEXT_QUESTION: "next-question",

  QUESTION_ENDED: "question-ended",

  SHOW_LEADERBOARD: "show-leaderboard",

  LEADERBOARD_UPDATED: "leaderboard-updated",

  QUIZ_FINISHED: "quiz-finished",

  // Errors
  QUIZ_ERROR: "quiz-error",
} as const;