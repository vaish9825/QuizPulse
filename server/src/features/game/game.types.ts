export interface GameState {
  status: "waiting" | "live" | "finished";

  currentQuestionIndex: number;

  startedAt: Date | null;

  questionStartedAt: Date | null;

  questionDuration: number;
}