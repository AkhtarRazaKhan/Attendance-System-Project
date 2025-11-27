import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Flex,
  Heading,
  Button,
  Box,
  Spacer,
  Text,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdChecklist, MdAnalytics, MdLogout } from 'react-icons/md';

const Dashboard = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHover = useColorModeValue('blue.50', 'gray.700');

  return (
    <Container maxW="1200px" p={6}>
      {/* Navbar */}
      <Flex
        as="nav"
        bgGradient="linear(to-r, blue.500, blue.600)"
        color="white"
        p={4}
        align="center"
        borderRadius="md"
        boxShadow="lg"
        mb={10}
      >
        <Heading size="lg">Admin Dashboard</Heading>
        <Spacer />
        <Button
          as={Link}
          to="/"
          colorScheme="red"
          variant="outline"
          leftIcon={<MdLogout />}
        >
          Logout
        </Button>
      </Flex>

      {/* Dashboard Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {[
          {
            icon: MdChecklist,
            title: 'Mark Attendance',
            desc: 'Quickly mark student attendance for any class and track daily presence.',
            link: '/attend',
            color: 'blue',
          },
          {
            icon: MdAnalytics,
            title: 'Attendance Summary',
            desc: 'View detailed class-wise attendance percentages and student records.',
            link: '/summery',
            color: 'green',
          },
        ].map((card) => (
          <Box
            key={card.title}
            bg={cardBg}
            p={6}
            borderRadius="lg"
            boxShadow="md"
            _hover={{
              bg: cardHover,
              transform: 'translateY(-6px)',
              boxShadow: '2xl',
            }}
            transition="0.3s"
          >
            <Flex align="center" mb={4}>
              <Box
                bg={`${card.color}.100`}
                borderRadius="full"
                p={3}
                mr={3}
              >
                <Icon as={card.icon} w={6} h={6} color={`${card.color}.500`} />
              </Box>
              <Heading size="md">{card.title}</Heading>
            </Flex>
            <Text color="gray.600" mb={4}>{card.desc}</Text>
            <Button as={Link} to={card.link} colorScheme={card.color}>
              Go
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Dashboard;
