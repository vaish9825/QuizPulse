export interface LeaderboardPlayer {
  playerId: string;
  nickname: string;
  score: number;
}

export interface LeaderboardData {
  correct: boolean;
  score: number;
  leaderboard: LeaderboardPlayer[];
}