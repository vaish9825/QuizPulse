import {
  QUESTION_TIME,
  LEADERBOARD_TIME,
} from "./game.constants.js";

import {
  getCurrentQuestion,
  nextQuestion,
} from "./game.service.js";

import { getIO } from "../../sockets/socket.js";

const timers = new Map<
  string,
  NodeJS.Timeout
>();

export function startQuestionTimer(
  roomCode: string
) {
  stopQuestionTimer(roomCode);

  const timer = setTimeout(
    async () => {
      const io = getIO();

      io.to(roomCode).emit(
        "question-ended"
      );

      setTimeout(async () => {
        try {
          const room =
            await nextQuestion(roomCode);

          const quiz =
            room.quizId as any;

          if (
            room.currentQuestionIndex >=
            quiz.questions.length
          ) {
            io.to(roomCode).emit(
              "quiz-finished"
            );

            return;
          }

          const question =
            await getCurrentQuestion(
              roomCode
            );

          io.to(roomCode).emit(
            "next-question",
            question
          );

          startQuestionTimer(
            roomCode
          );
        } catch (err) {
          console.error(err);
        }
      }, LEADERBOARD_TIME * 1000);
    },
    QUESTION_TIME * 1000
  );

  timers.set(roomCode, timer);
}

export function stopQuestionTimer(
  roomCode: string
) {
  const timer =
    timers.get(roomCode);

  if (!timer) return;

  clearTimeout(timer);

  timers.delete(roomCode);
}