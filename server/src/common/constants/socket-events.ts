export const SOCKET_EVENTS = {
  // Room
  JOIN_ROOM: "join-room",
  PARTICIPANTS_UPDATED: "participants-updated",

  // Quiz
  START_QUIZ: "start-quiz",
  QUIZ_STARTED: "quiz-started",

  PAUSE_QUIZ: "pause-quiz",
  QUIZ_PAUSED: "quiz-paused",

  RESUME_QUIZ: "resume-quiz",
  QUIZ_RESUMED: "quiz-resumed",

  END_QUIZ: "end-quiz",

  // Game
  SUBMIT_ANSWER: "submit-answer",
  ANSWER_RECEIVED: "answer-received",

  NEXT_QUESTION: "next-question",
  QUESTION_ENDED: "question-ended",

  SHOW_LEADERBOARD: "show-leaderboard",
  LEADERBOARD_UPDATED: "leaderboard-updated",

  QUIZ_FINISHED: "quiz-finished",

  // Errors
  QUIZ_ERROR: "quiz-error",
} as const;