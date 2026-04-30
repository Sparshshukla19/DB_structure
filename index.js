/**
 * models/index.js — central export for all Mongoose models.
 *
 * Import from here in your routes/controllers:
 *   const { User, Teacher, Timetable, Leave } = require("./models");
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Module map                                                 │
 * │                                                             │
 * │  auth/        Dev C — authentication & identity            │
 * │  profiles/    Dev C — user profile extensions              │
 * │  timetable/   Dev A — scheduling & academic structure      │
 * │  leave/       Dev B — leave & substitute management        │
 * └─────────────────────────────────────────────────────────────┘
 */

// ── Auth (Dev C) ────────────────────────────────────────────────
const User            = require("./auth/User");

// ── Profiles (Dev C) ────────────────────────────────────────────
const Staff           = require("./profiles/Staff");
const Student         = require("./profiles/Student");
const AcademicStatus  = require("./profiles/AcademicStatus");

// ── Timetable module (Dev A) ─────────────────────────────────────
const Teacher         = require("./profiles/Teacher");   // bridges A ↔ C
const Department      = require("./timetable/Department");
const Section         = require("./timetable/Section");
const Subject         = require("./timetable/Subject");
const LabRoom         = require("./timetable/LabRoom");
const Timetable       = require("./timetable/Timetable");
const TeacherSchedule = require("./timetable/TeacherSchedule"); // Dev B's Timetable, renamed

// ── Leave module (Dev B) ─────────────────────────────────────────
const Leave              = require("./leave/Leave");
const LeaveBalance       = require("./leave/LeaveBalance");
const SubstituteRequest  = require("./leave/SubstituteRequest");

module.exports = {
  // Auth
  User,
  // Profiles
  Staff,
  Teacher,
  Student,
  AcademicStatus,
  // Timetable
  Department,
  Section,
  Subject,
  LabRoom,
  Timetable,
  TeacherSchedule,
  // Leave
  Leave,
  LeaveBalance,
  SubstituteRequest,
};
