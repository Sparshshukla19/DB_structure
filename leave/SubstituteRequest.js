const mongoose = require("mongoose");

/**
 * SubstituteRequest — created automatically when a Leave is approved,
 * one document per affected period per day of absence.
 *
 * Flow:
 *   Leave approved → system creates SubstituteRequest(s)
 *   Requests sent to eligible teachers (requestedTo)
 *   A teacher accepts → status = "accepted"
 *   HOD confirms     → status = "hod_approved"
 *   Principal signs  → status = "principal_approved"
 *
 * Note: absentTeacherId and substituteTeacherId now reference Teacher
 * (not User) so the leave module can join schedules directly.
 * Use .populate("absentTeacherId.userId") to reach the User doc.
 */
const periodDetailSchema = new mongoose.Schema(
  {
    periodNumber: { type: Number, required: true },
    startTime:    { type: String, required: true },
    endTime:      { type: String, required: true },
    subject:      { type: String, required: true, trim: true },
    className:    { type: String, required: true, trim: true },
  },
  { _id: false }
);

const substituteRequestSchema = new mongoose.Schema(
  {
    leaveId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
      required: true,
      index: true,
    },
    absentTeacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      index: true,
    },
    substituteTeacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },
    period: {
      type: periodDetailSchema,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["open", "open_all", "accepted", "hod_approved", "principal_approved"],
      default: "open",
    },
    // Teachers this request has been sent to
    requestedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    // Teachers who declined this request
    rejectedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubstituteRequest", substituteRequestSchema);
