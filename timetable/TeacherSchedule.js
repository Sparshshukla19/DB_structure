const mongoose = require("mongoose");

/**
 * TeacherSchedule — a teacher's daily period schedule.
 *
 * Originally named "Timetable" in Dev B's codebase; renamed to
 * TeacherSchedule to avoid collision with Dev A's section-level
 * Timetable model.
 *
 * One document per teacher per day of the week.
 * Used by the leave/substitute module to determine which periods
 * are affected when a teacher is absent.
 */
const periodSchema = new mongoose.Schema(
  {
    periodNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    startTime: {
      type: String, // e.g. "09:00"
      required: true,
    },
    endTime: {
      type: String, // e.g. "10:00"
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    // String kept for flexibility; can be migrated to Section ObjectId ref
    className: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const teacherScheduleSchema = new mongoose.Schema(
  {
    // References Teacher (which in turn references User for auth)
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      index: true,
    },
    dayOfWeek: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      required: true,
    },
    periods: {
      type: [periodSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// One schedule per teacher per day
teacherScheduleSchema.index({ teacherId: 1, dayOfWeek: 1 }, { unique: true });

module.exports = mongoose.model("TeacherSchedule", teacherScheduleSchema);
