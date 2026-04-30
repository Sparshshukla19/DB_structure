const mongoose = require("mongoose");

/**
 * AcademicStatus — tracks a student's academic standing per semester.
 * References User (not Student) to allow direct lookups from auth context.
 */
const academicStatusSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    backlogs: {
      type: Number,
      default: 0,
      min: 0,
    },
    graduated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// One record per student per semester
academicStatusSchema.index({ userId: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model("AcademicStatus", academicStatusSchema);
