const mongoose = require("mongoose");

/**
 * Department — top-level academic unit (e.g. "Computer Science").
 * Referenced by Timetable and Staff/Teacher profiles.
 */
const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      trim: true,
      uppercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
