const mongoose = require("mongoose");

/**
 * Leave — a leave application submitted by a teacher.
 *
 * This model was missing from Dev B's codebase but is referenced
 * by SubstituteRequest. Added here to complete the leave lifecycle:
 *
 *   Teacher applies → Leave created
 *   Leave triggers  → SubstituteRequest(s) created per affected period
 *   HOD/Principal approves Leave → LeaveBalance updated
 */
const leaveSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      index: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["casual", "medical", "earned", "other"],
      default: "casual",
    },
    status: {
      type: String,
      enum: ["pending", "hod_approved", "principal_approved", "rejected", "cancelled"],
      default: "pending",
    },
    // Half of the academic year this leave falls in (for LeaveBalance deduction)
    half: {
      type: String,
      enum: ["first", "second"],
      required: true,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    rejectionReason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leave", leaveSchema);
