const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please provide a goal!"],
    },
    targetDate: {
      type: Date,
      required: true,
    },
    comments: [commentSchema],
    completed: {
      type: Boolean,
      default: false,
    },
    needsHelp: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
