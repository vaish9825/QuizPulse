import { Room } from "../room/room.model.js";
import type { SubmitAnswerPayload } from "./game.types.js";

export async function startGame(roomCode: string) {
  const room = await Room.findOne({
    roomCode,
  }).populate("quizId");

  if (!room) {
    throw new Error("Room not found");
  }

  room.status = "live";
  room.currentQuestionIndex = 0;
  room.currentQuestionStartedAt = new Date();

  await room.save();

  return room;
}

export async function getCurrentQuestion(
  roomCode: string
) {
  const room = await Room.findOne({
    roomCode,
  }).populate("quizId");

  if (!room) {
    throw new Error("Room not found");
  }

  const quiz = room.quizId as any;

  const question =
    quiz.questions[room.currentQuestionIndex];

  const duration =
  question.timeLimit ??
  room.questionDuration;

const elapsed = Math.floor(
  (Date.now() -
    new Date(
      room.currentQuestionStartedAt!
    ).getTime()) /
    1000
);

return {
  index: room.currentQuestionIndex,
  totalQuestions: quiz.questions.length,
  question: question.question,
  options: question.options,

  duration,

  remainingTime: Math.max(
    duration - elapsed,
    0
  ),
};
}

export async function submitAnswer(
  payload: SubmitAnswerPayload
) {
  const room = await Room.findOne({
    roomCode: payload.roomCode,
  }).populate("quizId");

  if (!room) {
    throw new Error("Room not found");
  }

  const quiz = room.quizId as any;

  const question =
    quiz.questions[room.currentQuestionIndex];

  const player = room.players.find(
    (p) => p.playerId === payload.playerId
  );

  if (!player) {
    throw new Error("Player not found");
  }

  if (room.answers.has(payload.playerId)) {
  throw new Error("Already answered");
}

room.answers.set(
  payload.playerId,
  payload.answer
);

  const isCorrect =
    payload.answer ===
    question.correctAnswer;

  if (isCorrect) {
    player.score += question.points ?? 100;
  }

  await room.save();

  return {
    correct: isCorrect,
    score: player.score,
    leaderboard: room.players
      .slice()
      .sort((a, b) => b.score - a.score),
  };
}

export async function nextQuestion(
  roomCode: string
) {
  const room = await Room.findOne({
    roomCode,
  }).populate("quizId");

  if (!room) {
    throw new Error("Room not found");
  }

  room.currentQuestionIndex++;

  room.currentQuestionStartedAt =
    new Date();

  room.answers.clear();

  await room.save();

  return room;
}

export function isLastQuestion(
  room: any
) {
  const quiz = room.quizId as any;

  return (
    room.currentQuestionIndex >=
    quiz.questions.length - 1
  );
}