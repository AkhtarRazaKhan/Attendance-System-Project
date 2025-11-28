const Student = require("../models/Student");

exports.getStudentsByClass = async (req, res) => {
  try {
    const { className } = req.params;

    const students = await Student.find({ className });

    return res.json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
