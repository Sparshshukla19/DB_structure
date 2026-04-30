const mongoose = require("mongoose");

/**
 * Staff — extended profile for all non-student users.
 * Links to the canonical User document via userId.
 * Used by: Dev C (auth/admin), general staff management.
 */
const staffSchema = new mongoose.Schema(
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
    // Section this staff member is class teacher of (optional)
    section: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      enum: ["PRINCIPAL", "HOD", "CLASS_TEACHER", "TEACHER"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
