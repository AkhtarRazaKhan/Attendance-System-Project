import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Dashboard from './Dashboard';
import AttendancePage from './Attendance';
import Summery from './Summery'
import Register from './Register';
import Login from './Login';
import { ChakraProvider } from '@chakra-ui/react';
function App() {
 
  const router=createBrowserRouter([
   
    
    // {
    //   path:'/',
    //   element:    <><Register/></>
    // },
    {
      path:'/',
      element:    <><Login/></>
    },
    {
        path:'/attend',
        element:    <><Dashboard/><AttendancePage/></>
      },
      {
        path:'/summery',
        element:    <><Dashboard/><Summery/></>
      },
      
    
  ])
  return (
    <>
 <ChakraProvider>
    <RouterProvider router={router} />
    </ChakraProvider>
    </>
  )
}

export default App
