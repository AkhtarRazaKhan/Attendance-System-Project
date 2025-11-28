// // controllers/attendanceController.js
// const Attendance = require('../models/Attendance');
// const Student = require('../models/Student');

// exports.markAttendance = async (req, res) => {
//   const { attendanceData, date } = req.body;

//   try {
//     for (const [studentId, status] of Object.entries(attendanceData)) {
//       await Attendance.findOneAndUpdate(
//         { student: studentId, date: new Date(date).toISOString().slice(0, 10) },
//         { status },
//         { upsert: true, new: true }
//       );
//     }
//     res.status(200).json({ message: 'Attendance marked successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to mark attendance', error });
//   }
// };
// // controllers/attendanceController.js
// exports.getClasswiseAttendance = async (req, res) => {
//     const { className } = req.params;
  
//     try {
//       // Fetch students by class
//       const students = await Student.find({ class: className });
//       if (!students.length) {
//         console.log('No students found for the given class.');
//         return res.status(404).json({ message: 'No students found' });
//       }
  
//       // Get total number of days
//       const totalDays = await Attendance.distinct('date').countDocuments();
//       if (totalDays === 0) {
//         console.log('No attendance records found.');
//         return res.status(404).json({ message: 'No attendance records found' });
//       }
  
//       // Calculate attendance percentages
//       const attendanceData = await Promise.all(students.map(async (student) => {
//         const totalPresentDays = await Attendance.countDocuments({
//           student: student._id,
//           status: 'Present',
//         });
  
//         const percentage = (totalPresentDays / totalDays) * 100;
  
//         return {
//           studentName: student.name,
//           rollNumber: student.rollNumber,
//           percentage: percentage.toFixed(2),
//         };
//       }));
  
//       res.status(200).json(attendanceData);
//     } catch (error) {
//       console.error('Failed to get class-wise attendance:', error);
//       res.status(500).json({ message: 'Failed to get class-wise attendance', error });
//     }
//   };

const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// MARK ATTENDANCE
exports.markAttendance = async (req, res) => {
  const { attendanceData, date } = req.body;

  try {
    for (const [studentId, status] of Object.entries(attendanceData)) {
      await Attendance.findOneAndUpdate(
        { student: studentId, date: new Date(date).toISOString().slice(0, 10) },
        { status },
        { upsert: true, new: true }
      );
    }
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark attendance', error });
  }
};

// GET CLASSWISE ATTENDANCE WITH PERCENTAGE
exports.getClasswiseAttendance = async (req, res) => {
  const { className } = req.params;

  try {
    // 1️⃣ Get all students in class
    const students = await Student.find({ class: className }); // ✅ fixed
    if (!students.length) return res.status(404).json({ message: 'No students found' });

    // 2️⃣ Total unique days
    const totalDaysArray = await Attendance.distinct('date'); // ✅ fixed
    const totalDays = totalDaysArray.length;
    if (totalDays === 0) return res.status(404).json({ message: 'No attendance records found' });

    // 3️⃣ Calculate percentage for each student
    const attendanceData = await Promise.all(
      students.map(async (student) => {
        const presentDays = await Attendance.countDocuments({
          student: student._id,
          status: 'Present',
        });

        return {
          studentName: student.name,
          rollNumber: student.rollNumber,
          percentage: ((presentDays / totalDays) * 100).toFixed(2),
        };
      })
    );

    res.status(200).json(attendanceData);
  } catch (error) {
    console.error('Failed to get class-wise attendance:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};
