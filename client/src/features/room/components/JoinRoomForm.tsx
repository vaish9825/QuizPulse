import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { socket } from "@/lib/socket";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

import { useJoinRoom } from "../hooks/useJoinRoom";

export default function JoinRoomForm() {
  const navigate = useNavigate();

  const joinRoom = useJoinRoom();

  const [roomCode, setRoomCode] =
    useState("");

  const [nickname, setNickname] =
    useState("");

  async function handleJoin() {
    if (!roomCode || !nickname) {
      toast.error(
        "Please fill all fields."
      );
      return;
    }

    try {
      const response =
        await joinRoom.mutateAsync({
          roomCode,
          nickname,
        });

      localStorage.setItem(
        "playerId",
        response.data.player.playerId
      );

      socket.connect();

      socket.emit(
        "join-room",
        roomCode
      );

      toast.success(
        "Joined room successfully!"
      );

      navigate(`/play/${roomCode}`);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Unable to join room."
      );
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">

      <div className="space-y-5">

        <Input
          placeholder="Room Code"
          value={roomCode}
          onChange={(e) =>
            setRoomCode(
              e.target.value.toUpperCase()
            )
          }
        />

        <Input
          placeholder="Nickname"
          value={nickname}
          onChange={(e) =>
            setNickname(
              e.target.value
            )
          }
        />

        <Button
          className="mt-3 w-full rounded-xl py-3"
          onClick={handleJoin}
          disabled={joinRoom.isPending}
        >
          {joinRoom.isPending
            ? "Joining..."
            : "Join Quiz"}
        </Button>

      </div>

    </div>
  );
}