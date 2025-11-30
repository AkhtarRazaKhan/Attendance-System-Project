import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Center,
  VStack,
  Heading,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
  SimpleGrid,
} from '@chakra-ui/react';

const ClasswiseAttendance = () => {
  const [className, setClassName] = useState('BCA');
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://attendance-system-project-60.onrender.com//api/attendance/classwise/${className}`
        );
        if (Array.isArray(data)) {
          setAttendanceData(data);
        } else {
          setAttendanceData([]);
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
        setAttendanceData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [className]);

  return (
    <Center py={10} px={4} bg="gray.100" minH="100vh">
      <Box
        w={{ base: '100%', md: '95%', lg: '90%' }}
        bg="white"
        p={8}
        borderRadius="2xl"
        boxShadow="2xl"
      >
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <VStack spacing={2}>
            <Heading as="h1" size="2xl" textAlign="center">
              Class-wise Attendance
            </Heading>
            <Text color="gray.500" textAlign="center">
              View the attendance percentage of students in {className} class
            </Text>
          </VStack>

          {/* Dropdown */}
          <Box maxW="300px" mx="auto">
            <Select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Select Class"
              size="lg"
              bg="white"
              borderColor="gray.300"
              fontWeight="semibold"
            >
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="BSc">BSc</option>
              <option value="MSc">MSc</option>
            </Select>
          </Box>

          {/* Attendance Summary Card */}
          {!loading && attendanceData.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} my={4}>
              <Box
                bg="blue.50"
                p={4}
                borderRadius="xl"
                textAlign="center"
                boxShadow="md"
              >
                <Text fontSize="lg" fontWeight="medium">
                  Total Students
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {attendanceData.length}
                </Text>
              </Box>
              <Box
                bg="yellow.50"
                p={4}
                borderRadius="xl"
                textAlign="center"
                boxShadow="md"
              >
                <Text fontSize="lg" fontWeight="medium">
                  Class Name
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {className}
                </Text>
              </Box>
            </SimpleGrid>
          )}

          {/* Loading */}
          {loading ? (
            <Center py={10} flexDirection="column">
              <Spinner size="xl" color="blue.500" />
              <Text mt={4} fontSize="lg" fontWeight="medium">
                Loading Attendance Data...
              </Text>
            </Center>
          ) : (
            <Box
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              overflowX="auto"
            >
              <Table variant="striped" colorScheme="blue" size="md">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Roll Number</Th>
                    <Th>Attendance %</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {attendanceData.length > 0 ? (
                    attendanceData.map((student) => (
                      <Tr key={student.rollNumber} _hover={{ bg: 'blue.50' }}>
                        <Td fontWeight="medium">{student.studentName}</Td>
                        <Td>{student.rollNumber}</Td>
                        <Td>{student.percentage}%</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan="3" textAlign="center">
                        No attendance data found
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default ClasswiseAttendance;
