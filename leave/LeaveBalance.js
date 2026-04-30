const mongoose = require("mongoose");

/**
 * LeaveBalance — tracks how many leave days a teacher has used
 * and how many remain in each half of the academic year.
 *
 * Dev B defined this twice; the second definition had a broken
 * `LeaveSchema` reference. This is the single, correct version.
 *
 * Academic year is split into two halves:
 *   First half  — typically June to October  (7 days default)
 *   Second half — typically November to April (8 days default)
 */
const leaveBalanceSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      index: true,
    },
    year: {
      type: Number,
      required: true,
    },
    firstHalfTotal: {
      type: Number,
      default: 7,
      min: 0,
    },
    firstHalfUsed: {
      type: Number,
      default: 0,
      min: 0,
    },
    secondHalfTotal: {
      type: Number,
      default: 8,
      min: 0,
    },
    secondHalfUsed: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// One balance record per teacher per year
leaveBalanceSchema.index({ teacherId: 1, year: 1 }, { unique: true });

// Virtual helpers
leaveBalanceSchema.virtual("firstHalfRemaining").get(function () {
  return this.firstHalfTotal - this.firstHalfUsed;
});
leaveBalanceSchema.virtual("secondHalfRemaining").get(function () {
  return this.secondHalfTotal - this.secondHalfUsed;
});

module.exports = mongoose.model("LeaveBalance", leaveBalanceSchema);
