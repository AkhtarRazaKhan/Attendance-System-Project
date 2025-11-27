import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Button,
  VStack,
  Text,
  HStack,
  useBreakpointValue
} from '@chakra-ui/react';

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState('BCA');  // Default class
  const [students, setStudents] = useState([]);  // Initialize as an empty array
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Current date

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/students/class/${selectedClass}`);
        // Ensure data is an array
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          console.error('Unexpected data format:', data);
          setStudents([]);  // Set as empty array in case of unexpected format
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);  // Set as empty array in case of error
      }
    };

    fetchStudents();
  }, [selectedClass]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const submitAttendance = async () => {
    try {
      await axios.post('http://localhost:5000/api/attendance/mark', {
        attendanceData: attendance,
        date: date,
      });
      alert('Attendance submitted successfully');
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert('Failed to submit attendance');
    }
  };

  return (
    <Box
      minHeight="100vh"
      bgGradient="linear(to-r, teal.400, blue.400)"
      p={8}
    >
      <Container maxW="container.md" centerContent>
        <Box
          p={8}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="md"
          bg="white"
          width="100%"
        >
          <Heading as="h1" mb={6} textAlign="center">Mark Attendance for {selectedClass} - {date}</Heading>

          <VStack spacing={6} align="stretch">
            {/* Date Picker */}
            <FormControl>
              <FormLabel>Select Date</FormLabel>
              <Input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>

            {/* Dropdown to select class */}
            <FormControl>
              <FormLabel>Select Class</FormLabel>
              <Select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="BSc">BSc</option>
                <option value="MSc">MSc</option>
                {/* Add more classes as needed */}
              </Select>
            </FormControl>

            {/* Display students for the selected class */}
            <Box>
              {students.length > 0 ? (
                students.map((student) => (
                  <HStack key={student._id} spacing={4} align="center" p={3} borderBottom="1px" borderColor="gray.200">
                    <Text flex={1}>{student.name} - {student.rollNumber}</Text>
                    <Checkbox 
                      isChecked={attendance[student._id] === 'Present'}
                      onChange={() => handleAttendanceChange(student._id, 'Present')}
                    >
                      Present
                    </Checkbox>
                    <Checkbox 
                      isChecked={attendance[student._id] === 'Absent'}
                      onChange={() => handleAttendanceChange(student._id, 'Absent')}
                    >
                      Absent
                    </Checkbox>
                  </HStack>
                ))
              ) : (
                <Text>No students found</Text>
              )}
            </Box>

            {/* Submit button */}
            <Button 
              colorScheme="blue" 
              onClick={submitAttendance}
            >
              Submit Attendance
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default AttendancePage;
