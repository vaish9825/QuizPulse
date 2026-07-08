import { useEffect, useState } from "react";

import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/shared/constants/socket-events";

import type {
  LeaderboardData,
} from "../types/leaderboard.types";

export function useLeaderboard() {
  const [data, setData] =
    useState<LeaderboardData | null>(null);

  useEffect(() => {
    const onLeaderboardUpdated = (
      payload: LeaderboardData
    ) => {
      setData(payload);
    };

    socket.on(
      SOCKET_EVENTS.LEADERBOARD_UPDATED,
      onLeaderboardUpdated
    );

    return () => {
      socket.off(
        SOCKET_EVENTS.LEADERBOARD_UPDATED,
        onLeaderboardUpdated
      );
    };
  }, []);

  return data;
}