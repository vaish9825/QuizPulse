import mongoose, { Schema } from "mongoose";

const PlayerSchema = new Schema(
  {
    playerId: {
      type: String,
      required: true,
    },

    nickname: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },

    isConnected: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  }
);

const RoomSchema = new Schema(
  {
    roomCode: {
      type: String,
      unique: true,
      required: true,
    },

    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    hostId: {
      type: String,
      default: "anonymous",
    },

    status: {
      type: String,
      enum: ["waiting", "live", "finished"],
      default: "waiting",
    },

    currentQuestionIndex: {
      type: Number,
      default: 0,
    },

    currentQuestionStartedAt: {
      type: Date,
      default: null,
    },

    answers: {
      type: Map,
      of: Number,
      default: {},
    },

    questionDuration: {
      type: Number,
      default: 20,
    },

    players: {
      type: [PlayerSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Room = mongoose.model("Room", RoomSchema);