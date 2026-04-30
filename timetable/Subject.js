const mongoose = require("mongoose");

/**
 * Subject — a course offered to a section in a semester.
 * Used by the timetable generator (Dev A) to schedule slots
 * and assign teachers.
 */
const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["theory", "lab", "tutorial"],
      required: true,
    },
    // How many slots per week this subject needs
    weeklySlots: {
      type: Number,
      required: true,
      min: 1,
    },
    // Duration of each slot in hours (default 1 for theory, 2 for lab)
    duration: {
      type: Number,
      default: 1,
      min: 1,
    },
    // For lab subjects split into batches (e.g. ["A", "B", "C"])
    batches: {
      type: [String],
      default: [],
    },
    // Teachers who are permitted to teach this subject
    allowedTeachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    // Section this subject belongs to (null = elective / shared)
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
