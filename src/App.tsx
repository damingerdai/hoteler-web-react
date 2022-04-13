import { Box } from '@chakra-ui/react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.scss';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Customer = React.lazy(() => import('./pages/Customer'));
const Room = React.lazy(() => import('./pages/Room'));
const Login = React.lazy(() => import('./pages/Login'));

const App = () => (
  <>
    <Navbar />
    <Box as='section'>
      <Routes>
        <Route path='/dashboard' element={<React.Suspense fallback={<div>...</div>}><Dashboard /></React.Suspense>} />
        <Route path='customer' element={<React.Suspense fallback={<div>...</div>}><Customer /></React.Suspense>} />
        <Route path='/room' element={<React.Suspense fallback={<div>...</div>}><Room /></React.Suspense>} />
        <Route path='login' element={<React.Suspense fallback={<div>...</div>}><Login /></React.Suspense>} />
      </Routes>
    </Box>
  </>
);

export default App;
