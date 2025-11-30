import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  useToast,
  Spinner,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setMessage('');

    try {
      const response = await axios.post(
        'https://attendance-system-project-60.onrender.com/api/auth/login',
        { email, password }
      );

      localStorage.setItem('token', response.data.token);

      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });

      navigate('/attend');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
      toast({
        title: 'Login Failed',
        description: error.response?.data?.message || 'Please check your credentials',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box
      minHeight="100vh"
      bgGradient="linear(to-r, teal.400, blue.500)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        bg="rgba(255, 255, 255, 0.85)"
        backdropFilter="blur(10px)"
        p={10}
        borderRadius="2xl"
        boxShadow="2xl"
        width={{ base: '100%', md: '450px' }}
        textAlign="center"
      >
        <Heading as="h1" size="2xl" mb={2} color="gray.700">
          Welcome Back
        </Heading>
        <Text color="gray.500" mb={8}>
          Please login to access your dashboard
        </Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                size="lg"
                focusBorderColor="blue.400"
                borderColor="gray.300"
                bg="whiteAlpha.800"
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                size="lg"
                focusBorderColor="blue.400"
                borderColor="gray.300"
                bg="whiteAlpha.800"
              />
            </FormControl>

            <Button
              colorScheme="blue"
              type="submit"
              width="full"
              size="lg"
              fontWeight="bold"
              _hover={{ bg: 'blue.600' }}
              transition="all 0.3s"
              isDisabled={loading} // Disable button while loading
            >
              {loading ? <Spinner size="sm" color="white" /> : 'Login'}
            </Button>
          </VStack>
        </form>

        {message && (
          <Text color="red.500" fontWeight="medium" mt={4}>
            {message}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Login;
