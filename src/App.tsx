import { Box } from '@chakra-ui/react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalLoading from './components/GlobalLoading';
import Navbar from './components/Navbar';
import './App.scss';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Customer = React.lazy(() => import('./pages/Customer'));
const Room = React.lazy(() => import('./pages/Room'));
const Login = React.lazy(() => import('./pages/Login'));
const Forbidden = React.lazy(() => import('./pages/Forbidden'));

const App = () => (
  <>
    <Navbar />
    <Box as='section'>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='dashboard' element={<React.Suspense fallback={<GlobalLoading />}><Dashboard /></React.Suspense>} />
        <Route path='customer' element={<React.Suspense fallback={<GlobalLoading />}><Customer /></React.Suspense>} />
        <Route path='room' element={<React.Suspense fallback={<GlobalLoading />}><Room /></React.Suspense>} />
        <Route path='loading' element={<React.Suspense fallback={<GlobalLoading />}><GlobalLoading /></React.Suspense>} />
        <Route path='login' element={<React.Suspense fallback={<GlobalLoading />}><Login /></React.Suspense>} />
        <Route path='403' element={<React.Suspense fallback={<GlobalLoading />}><Forbidden /></React.Suspense>} />
        <Route path='*/*' element={<React.Suspense fallback={<GlobalLoading />}><Dashboard /></React.Suspense>} />
      </Routes>
    </Box>
  </>
);

export default App;
