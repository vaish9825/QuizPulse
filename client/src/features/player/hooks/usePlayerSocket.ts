import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "@/lib/socket";

export function usePlayerSocket(roomCode: string) {

  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();

    const onConnect = () => {
      console.log("🟢 Player Connected:", socket.id);

      socket.emit("join-room", roomCode);

      console.log("📥 Joined room:", roomCode);
    };

    const onQuizStarted = () => {
      console.log("🎉 quiz-started received");

      navigate(`/play/${roomCode}/question`);
    };

    socket.on("connect", onConnect);
        socket.onAny((event) => {
      console.log("📨 EVENT:", event);
    });
    socket.on("quiz-started", onQuizStarted);

    return () => {
      socket.off("connect", onConnect);
      socket.off("quiz-started", onQuizStarted);
    };
  }, [roomCode, navigate]);
}