export const QUESTION_TIME = 20;

export const LEADERBOARD_TIME = 5;

export const GAME_STATUS = {
  WAITING: "waiting",

  LIVE: "live",

  PAUSED: "paused",

  LEADERBOARD: "leaderboard",

  FINISHED: "finished",
} as const;

export const PLAYER_STATUS = {
  CONNECTED: "connected",

  DISCONNECTED: "disconnected",
} as const;