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

  const [roomCode, setRoomCode] = useState("");
  const [nickname, setNickname] = useState("");

async function handleJoin() {
  if (!roomCode || !nickname) {
    toast.error("Please fill all fields.");
    return;
  }

  try {
    await joinRoom.mutateAsync({
      roomCode,
      nickname,
    });

    socket.connect();

    socket.emit("join-room", roomCode);

    toast.success("Joined room successfully!");

    navigate(`/play/${roomCode}`);
  } catch (error: any) {
    console.error(error);

    toast.error(
      error.response?.data?.message ??
      "Unable to join room."
    );
  }
}

  return (
    <div className="space-y-6 rounded-xl bg-slate-900 p-8">
      <Input
        placeholder="Room Code"
        value={roomCode}
        onChange={(e) =>
          setRoomCode(e.target.value.toUpperCase())
        }
      />

      <Input
        placeholder="Nickname"
        value={nickname}
        onChange={(e) =>
          setNickname(e.target.value)
        }
      />

      <Button
        onClick={handleJoin}
        disabled={joinRoom.isPending}
      >
        {joinRoom.isPending
          ? "Joining..."
          : "Join Room"}
      </Button>
    </div>
  );
}