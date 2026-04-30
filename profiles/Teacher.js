const mongoose = require("mongoose");

/**
 * Teacher — extended profile used by the timetable module (Dev A)
 * and the leave management module (Dev B).
 *
 * Bridges to the canonical User document via userId so that a
 * logged-in user can look up their own timetable, schedule, and
 * leave records in a single query.
 *
 * Note: A person who is a teacher will have BOTH a Staff doc
 * (for HR/admin purposes) AND a Teacher doc (for timetable/leave).
 */
const teacherSchema = new mongoose.Schema(
  {
    // ── Bridge to auth (Dev C) ──────────────────────────────────────
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    // ── Timetable module fields (Dev A) ─────────────────────────────
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // College-assigned teacher ID (e.g. "TCH-042"), separate from MongoDB _id
    teacherId: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },
    // Subjects this teacher is qualified / assigned to teach
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
