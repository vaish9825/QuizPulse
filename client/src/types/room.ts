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

export interface Room {
  roomCode: string;
  status: "waiting" | "live" | "finished";
  currentQuestionIndex: number;
  players: Player[];
  quizId: Quiz;
}