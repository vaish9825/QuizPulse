export interface Player {
  playerId: string;
  nickname: string;
  score: number;
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
  questions: Question[];
}

export interface GameState {
  status: "waiting" | "live" | "finished";
  currentQuestionIndex: number;
  questionStartedAt: string | null;
  questionDuration: number;
}

export interface Room {
  roomCode: string;
  hostId: string;
  players: Player[];
  quizId: Quiz;
  game: GameState;
}