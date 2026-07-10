import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["mcq", "true_false"],
      default: "mcq",
    },

    options: {
      type: [String],
      default: [],
    },

    correctAnswer: {
      type: Number,
      required: true,
    },

    explanation: {
      type: String,
      default: "",
    },

    points: {
      type: Number,
      default: 100,
    },

    timeLimit: {
      type: Number,
      default: 20,
    },
  },
  {
    _id: false,
  }
);

const QuizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    questions: {
      type: [QuestionSchema],
      default: [],
    },

    createdBy: {
      type: String,
      default: "anonymous",
    },
    source: {
  type: String,
  enum: ["manual", "ai"],
  default: "manual",
},
  },
  {
    timestamps: true,
  }
);

export const Quiz = mongoose.model("Quiz", QuizSchema);