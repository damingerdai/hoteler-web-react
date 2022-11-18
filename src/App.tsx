import { Box } from '@chakra-ui/react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalLoading from './components/GlobalLoading';
import Navbar from './components/Navbar';
import { withSuspense } from './components/WithSuspense';
import './App.scss';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Customer = React.lazy(() => import('./pages/Customer'));
const Room = React.lazy(() => import('./pages/Room'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Forbidden = React.lazy(() => import('./pages/Forbidden'));

const Layout: React.FC = () => (
  <Routes>
    <Route
      path='dashboard'
      element={(
        withSuspense(<Dashboard />)
      )}
    />
    <Route
      path='customer'
      element={(
        withSuspense(<Customer />)
      )}
    />
    <Route
      path='room'
      element={(
        withSuspense(<Room />)
      )}
    />
    <Route
      path='login'
      element={(
        withSuspense(<Login />)
      )}
    />
    <Route
      path='register'
      element={(
        withSuspense(<Register />)
      )}
    />
  </Routes>
);

const App = () => (
  <>
    <Navbar />
    <Box as='section'>
      <Routes>
        <Route path='/*' element={<Layout />} />
        <Route
          path='403'
          element={(
            <React.Suspense fallback={<GlobalLoading />}>
              <Forbidden />
            </React.Suspense>
          )}
        />
        <Route
          path='*/*'
          element={(
            <React.Suspense fallback={<GlobalLoading />}>
              <Dashboard />
            </React.Suspense>
          )}
        />
      </Routes>
    </Box>
  </>
);

export default App;
