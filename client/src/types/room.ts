export interface Player {
  playerId: string;
  nickname: string;
  score: number;
  joinedAt: string;
  isConnected: boolean;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  questions: Question[];
}

export type RoomStatus =
  | "waiting"
  | "live"
  | "paused"
  | "leaderboard"
  | "finished";

export interface Room {
  _id: string;

  roomCode: string;

  hostId: string;

  status: RoomStatus;

  currentQuestionIndex: number;

  currentQuestionStartedAt: string | null;

  questionDuration: number;

  players: Player[];

  quizId: Quiz;
}