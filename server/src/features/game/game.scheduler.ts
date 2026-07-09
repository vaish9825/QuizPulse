import { getIO } from "../../sockets/socket.js";

import { SOCKET_EVENTS } from "../../common/constants/socket-events.js";

import {
  LEADERBOARD_TIME,
  GAME_STATUS,
} from "./game.constants.js";

import {
  getCurrentQuestion,
  nextQuestion,
  getRoom,
  isLastQuestion,
} from "./game.service.js";

import {
  getGameState,
  setGameState,
  deleteGameState,
} from "./gameState.js";

export async function startScheduler(
  roomCode: string
) {
  stopScheduler(roomCode);

  const question =
    await getCurrentQuestion(roomCode);

  await startQuestion(
    roomCode,
    question.remainingTime
  );
}

async function startQuestion(
  roomCode: string,
  duration: number
) {
  const io = getIO();

  const question =
    await getCurrentQuestion(roomCode);

  io.to(roomCode).emit(
    SOCKET_EVENTS.NEXT_QUESTION,
    question
  );

  const startedAt = Date.now();

  const timer = setTimeout(
    () => endQuestion(roomCode),
    duration * 1000
  );

  setGameState(roomCode, {
    timer,
    startedAt,
    duration,
    remainingTime: duration,
  });
}

export async function pauseScheduler(
  roomCode: string
) {
  const game =
    getGameState(roomCode);

  if (!game) return;

  clearTimeout(game.timer);

  const elapsed = Math.floor(
    (Date.now() - game.startedAt) / 1000
  );

  game.remainingTime = Math.max(
    game.duration - elapsed,
    1
  );

  setGameState(roomCode, game);

  const room =
    await getRoom(roomCode);

  room.status = GAME_STATUS.PAUSED;

  await room.save();

  const io = getIO();

  io.to(roomCode).emit(
    SOCKET_EVENTS.QUIZ_PAUSED
  );

  io.to(roomCode).emit(
    SOCKET_EVENTS.PARTICIPANTS_UPDATED
  );
}

export async function resumeScheduler(
  roomCode: string
) {
  const game =
    getGameState(roomCode);

  if (!game) return;

  const room =
    await getRoom(roomCode);

  // Restart elapsed time from now
  room.currentQuestionStartedAt =
    new Date();

  room.status =
    GAME_STATUS.LIVE;

  await room.save();

  const timer = setTimeout(
    () => endQuestion(roomCode),
    game.remainingTime * 1000
  );

  game.startedAt = Date.now();

  game.duration =
    game.remainingTime;

  game.timer = timer;

  setGameState(roomCode, game);

  const io = getIO();

  io.to(roomCode).emit(
    SOCKET_EVENTS.QUIZ_RESUMED,
    {
      remainingTime:
        game.remainingTime,
    }
  );

  io.to(roomCode).emit(
    SOCKET_EVENTS.PARTICIPANTS_UPDATED
  );
}

export async function endQuiz(
  roomCode: string
) {
  stopScheduler(roomCode);

  const room =
    await getRoom(roomCode);

  room.status =
    GAME_STATUS.FINISHED;

  await room.save();

  const leaderboard =
    room.players
      .slice()
      .sort(
        (a, b) =>
          b.score - a.score
      );

  const io = getIO();

  io.to(roomCode).emit(
    SOCKET_EVENTS.PARTICIPANTS_UPDATED
  );

  io.to(roomCode).emit(
    SOCKET_EVENTS.QUIZ_FINISHED,
    {
      leaderboard,
    }
  );
}

function stopScheduler(
  roomCode: string
) {
  const game =
    getGameState(roomCode);

  if (game) {
    clearTimeout(game.timer);

    deleteGameState(roomCode);
  }
}

async function endQuestion(
  roomCode: string
) {
  const io = getIO();

  const room =
    await getRoom(roomCode);

  room.status =
    GAME_STATUS.LEADERBOARD;

  await room.save();

  const quiz = room.quizId as any;

  const currentQuestion =
    quiz.questions[
      room.currentQuestionIndex
    ];

  const leaderboard =
    room.players
      .slice()
      .sort(
        (a, b) =>
          b.score - a.score
      );

  io.to(roomCode).emit(
    SOCKET_EVENTS.QUESTION_ENDED,
    {
      correctAnswer:
        currentQuestion.correctAnswer,
    }
  );

  setTimeout(() => {

    io.to(roomCode).emit(
      SOCKET_EVENTS.LEADERBOARD_UPDATED,
      {
        leaderboard,
      }
    );

    io.to(roomCode).emit(
      SOCKET_EVENTS.SHOW_LEADERBOARD
    );

  }, 3000);

  setTimeout(
    () => advance(roomCode),
    (LEADERBOARD_TIME + 3) * 1000
  );
}

async function advance(
  roomCode: string
) {
  const room =
    await getRoom(roomCode);

  if (isLastQuestion(room)) {

    await endQuiz(roomCode);

    return;
  }

  await nextQuestion(roomCode);

  const question =
    await getCurrentQuestion(
      roomCode
    );

  await startQuestion(
    roomCode,
    question.remainingTime
  );
}