const mongoose = require("mongoose");

/**
 * Student — extended profile for users with role STUDENT.
 * Links to the canonical User document via userId.
 */
const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    section: {
      type: String,
      trim: true,
    },
    semester: {
      type: Number,
      min: 1,
      max: 8,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
