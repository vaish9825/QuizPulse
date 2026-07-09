type ActiveGame = {
  timer: NodeJS.Timeout;
  startedAt: number;
  duration: number;
  remainingTime: number;
};

const activeGames = new Map<
  string,
  ActiveGame
>();

export function getGameState(
  roomCode: string
) {
  return activeGames.get(roomCode);
}

export function setGameState(
  roomCode: string,
  game: ActiveGame
) {
  activeGames.set(roomCode, game);
}

export function deleteGameState(
  roomCode: string
) {
  activeGames.delete(roomCode);
}