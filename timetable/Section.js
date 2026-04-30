const mongoose = require("mongoose");

/**
 * Section — a class section within a department and semester
 * (e.g. "CSE-6A", "ISE-4B").
 *
 * Referenced by: Subject, Timetable (Dev A) and Student profiles (Dev C).
 * Dev B's TeacherSchedule references periods which carry className strings
 * for flexibility, but can be migrated to ObjectId refs if needed.
 */
const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    // The class teacher responsible for this section
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },
  },
  { timestamps: true }
);

sectionSchema.index({ name: 1, department: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model("Section", sectionSchema);
