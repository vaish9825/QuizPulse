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

const activeGames = new Map<
  string,
  NodeJS.Timeout
>();

export async function startScheduler(
  roomCode: string
) {
  stopScheduler(roomCode);

  await startQuestion(roomCode);
}

function stopScheduler(roomCode: string) {
  const timer = activeGames.get(roomCode);

  if (timer) {
    clearTimeout(timer);
    activeGames.delete(roomCode);
  }
}

async function startQuestion(
  roomCode: string
) {
  const io = getIO();

  const question =
    await getCurrentQuestion(roomCode);

  io.to(roomCode).emit(
    SOCKET_EVENTS.NEXT_QUESTION,
    question
  );

  const timer = setTimeout(
    () => endQuestion(roomCode),
    question.remainingTime * 1000
  );

  activeGames.set(roomCode, timer);
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

  const leaderboard =
    room.players
      .slice()
      .sort(
        (a, b) => b.score - a.score
      );

  // Navigate everyone first
  io.to(roomCode).emit(
    SOCKET_EVENTS.QUESTION_ENDED
  );

  // Give React time to mount LeaderboardPage
  setTimeout(() => {
    io.to(roomCode).emit(
      SOCKET_EVENTS.LEADERBOARD_UPDATED,
      {
        leaderboard,
      }
    );
  }, 200);

  // Advance after leaderboard screen
  setTimeout(
    () => advance(roomCode),
    LEADERBOARD_TIME * 1000
  );
}

async function advance(
  roomCode: string
) {
  const io = getIO();

  const room =
    await getRoom(roomCode);

  if (isLastQuestion(room)) {
    room.status =
      GAME_STATUS.FINISHED;

    await room.save();

    stopScheduler(roomCode);

    io.to(roomCode).emit(
      SOCKET_EVENTS.QUIZ_FINISHED,
      {
        leaderboard:
          room.players
            .slice()
            .sort(
              (a, b) => b.score - a.score
            ),
      }
    );

    return;
  }

  await nextQuestion(roomCode);

  await startQuestion(roomCode);
}