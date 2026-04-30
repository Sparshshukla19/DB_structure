``` bash
models/
├── auth/
│   └── User.js            ← Dev C (canonical auth)
├── profiles/
│   ├── Staff.js           ← Dev C
│   ├── Teacher.js         ← Dev A + userId bridge field added
│   └── Student.js         ← Dev C
│   └── AcademicStatus.js  ← Dev C
├── timetable/
│   ├── Department.js      ← Dev A
│   ├── Section.js         ← referenced by both A & C
│   ├── Subject.js         ← Dev A
│   ├── LabRoom.js         ← Dev A
│   ├── Timetable.js       ← Dev A (grid-based, section timetable)
│   └── TeacherSchedule.js ← Dev B (renamed from Timetable)
└── leave/
    ├── Leave.js           ← New (was missing, referenced by SubstituteRequest)
    ├── LeaveBalance.js    ← Dev B (deduplicated)
    └── SubstituteRequest.js ← Dev B

```
