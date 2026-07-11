import { useEffect, useState } from "react";

import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/shared/constants/socket-events";

import type {
  LeaderboardData,
} from "../types/leaderboard.types";

export function useLeaderboard() {
  const [data, setData] =
    useState<LeaderboardData | null>(() => {
      const cached =
        sessionStorage.getItem(
          "leaderboard"
        );

      return cached
        ? JSON.parse(cached)
        : null;
    });

  useEffect(() => {
    const onLeaderboardUpdated = (
      payload: LeaderboardData
    ) => {

      sessionStorage.setItem(
        "leaderboard",
        JSON.stringify(payload)
      );

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