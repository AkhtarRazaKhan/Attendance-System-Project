const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
  date: Date,
  status: String,  // 'Present' or 'Absent'
});

module.exports = mongoose.model('Attendance', attendanceSchema);