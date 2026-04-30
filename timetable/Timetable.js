const mongoose = require("mongoose");

/**
 * Timetable — the auto-generated weekly schedule for a section.
 *
 * grid is a 3D array: grid[day][slot][entry]
 * where each entry is a Mixed object containing subject, teacher,
 * classroom / lab room info for that slot.
 *
 * This is Dev A's timetable. Dev B's per-teacher daily schedule
 * lives in the TeacherSchedule model to avoid naming conflicts.
 */
const timetableSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
      index: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    // Default classroom assigned to this section
    classroom: {
      type: String,
      required: true,
      trim: true,
    },
    // 3D grid: [day][periodSlot][subjectEntry]
    grid: {
      type: [[[mongoose.Schema.Types.Mixed]]],
      default: [],
    },
    // Soft-conflict warnings produced during generation
    warnings: {
      type: [String],
      default: [],
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["generated", "edited", "approved"],
      default: "generated",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);
