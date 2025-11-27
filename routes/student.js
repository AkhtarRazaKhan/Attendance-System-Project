const express = require('express');
const Student = require('../models/Student');
const router = express.Router();

// Get students by class
router.get("/class/:className", async (req, res) => {
  try {
    const students = await Student.find({ class: req.params.className });
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Add new student (optional)
router.post("/add", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

module.exports = router;