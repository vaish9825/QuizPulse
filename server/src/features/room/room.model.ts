import mongoose, { Schema } from "mongoose";

const RoomSchema = new Schema(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    hostId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["waiting", "live", "finished"],
      default: "waiting",
    },

    players: [
      {
        id: String,
        name: String,
        score: {
          type: Number,
          default: 0,
        },
      },
    ],

    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Room = mongoose.model("Room", RoomSchema);