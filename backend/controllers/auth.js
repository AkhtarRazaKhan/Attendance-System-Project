const Teacher = require('../models/Teacher');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

exports.loginTeacher = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      console.log('Login attempt with email:', email);
  
      const teacher = await Teacher.findOne({ email });
      if (!teacher) {
        console.log('No teacher found with this email');
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // const isMatch = await teacher.comparePassword(password);
      // if (!isMatch) {
      //   console.log('Password does not match');
      //   return res.status(400).json({ message: 'Invalid email or password' });
      // }
  
      const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('Login successful, token generated');
      res.status(200).json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed', error });
    }
  };
  