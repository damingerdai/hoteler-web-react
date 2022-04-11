import React from 'react';
import { Box } from '@chakra-ui/react';

import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Login from './components/Login';
import Navbar from './components/Navbar';

const Home = () => <Box>this is home</Box>;
const Home2 = () => <Box>this is home 2</Box>;

const App = () => (
  <>
    <Navbar />
    <Box as='section'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='home2' element={<Home2 />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Box>
  </>
);

export default App;
