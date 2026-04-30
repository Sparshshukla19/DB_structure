const mongoose = require("mongoose");

/**
 * LabRoom — a physical laboratory room that can be scheduled
 * for lab subjects by the timetable generator (Dev A).
 */
const labRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    capacity: {
      type: Number,
      default: 30,
    },
    // Which department owns/manages this lab (optional)
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LabRoom", labRoomSchema);
