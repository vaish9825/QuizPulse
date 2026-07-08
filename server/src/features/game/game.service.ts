import { Room } from "../room/room.model.js";

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

  if (!question) {
    throw new Error("Question not found");
  }

  return {
    index: room.currentQuestionIndex,
    totalQuestions: quiz.questions.length,
    question: question.question,
    options: question.options,
    duration:
      question.timeLimit ??
      room.questionDuration,
  };
}