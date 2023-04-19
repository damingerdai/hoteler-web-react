import React from 'react';
import {
  createBrowserRouter, Navigate, RouterProvider,
} from 'react-router-dom';
import { withSuspense } from './components/WithSuspense';
import './App.scss';
import { Layout } from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Customer = React.lazy(() => import('./pages/Customer'));
const Room = React.lazy(() => import('./pages/Room'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Forbidden = React.lazy(() => import('./pages/Forbidden'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Navigate replace to='/login' />,
      },
      {
        path: 'dashboard',
        element: withSuspense(<Dashboard />),
      },
      {
        path: 'customer',
        element: withSuspense(<Customer />),
      },
      {
        path: 'room',
        element: withSuspense(<Room />),
      },
      {
        path: 'login',
        element: withSuspense(<Login />),
      },
      {
        path: 'register',
        element: withSuspense(<Register />),
      },
      {
        path: 'orbidden',
        element: withSuspense(<Forbidden />),
      },
    ],
  },
]);

const App = () => (
  <RouterProvider router={router} />
);

export default App;
