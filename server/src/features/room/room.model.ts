import mongoose, { Schema } from "mongoose";
import { GAME_STATUS } from "../game/game.constants.js";

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
      uppercase: true,
      trim: true,
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
      enum: Object.values(GAME_STATUS),
      default: GAME_STATUS.WAITING,
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

export const Room = mongoose.model(
  "Room",
  RoomSchema
);