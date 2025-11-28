// routes/attendance.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// MARK ATTENDANCE
router.post("/mark", async (req, res) => {
  try {
    const { attendanceData, date } = req.body;

    for (let studentId in attendanceData) {
      await Attendance.findOneAndUpdate(
        { student: studentId, date: new Date(date).toISOString().slice(0, 10) },
        { status: attendanceData[studentId] },
        { upsert: true, new: true }
      );
    }

    res.json({ message: "Attendance Saved Successfully ✔" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// CLASSWISE ATTENDANCE WITH PERCENTAGE
router.get("/classwise/:className", async (req, res) => {
  const { className } = req.params;

  try {
    // 1️⃣ Get all students in the class
    const students = await Student.find({ class: className }); // ✅ fixed field
    if (!students.length) return res.status(404).json({ message: "No students found" });

    // 2️⃣ Get total unique attendance days
    const totalDaysArray = await Attendance.distinct('date');
    const totalDays = totalDaysArray.length;
    if (totalDays === 0) return res.status(404).json({ message: "No attendance records found" });

    // 3️⃣ Calculate attendance percentage for each student
    const attendanceData = await Promise.all(
      students.map(async (student) => {
        const presentDays = await Attendance.countDocuments({
          student: student._id,
          status: 'Present'
        });

        return {
          studentName: student.name,
          rollNumber: student.rollNumber,
          percentage: ((presentDays / totalDays) * 100).toFixed(2)
        };
      })
    );

    res.json(attendanceData);
  } catch (err) {
    console.error("Classwise Attendance Error:", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// OPTIONAL: Attendance summary route
router.get("/summary/:className", async (req, res) => {
  const { className } = req.params;

  try {
    const records = await Attendance.find().populate("student");

    const filtered = records.filter(
      (item) => item.student && item.student.class === className // ✅ fixed field
    );

    res.json(filtered);
  } catch (err) {
    console.error("Summary Error:", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

module.exports = router;
