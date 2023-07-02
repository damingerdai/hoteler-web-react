import React from 'react';
import {
  createBrowserRouter, Navigate, RouterProvider,
} from 'react-router-dom';
import { withSuspense } from './components/WithSuspense';
import './App.scss';
import { CommonLayout, LoginLayout } from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Customer = React.lazy(() => import('./pages/Customer'));
const Room = React.lazy(() => import('./pages/Room'));
const User = React.lazy(() => import('./pages/User'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Forbidden = React.lazy(() => import('./pages/Forbidden'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <CommonLayout />,
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
        path: 'user',
        element: withSuspense(<User />),
      },
    ],
  },
  {
    path: '/',
    element: <LoginLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'login',
        element: withSuspense(<Login />),
      },
      {
        path: 'register',
        element: withSuspense(<Register />),
      },
      {
        path: '403',
        element: withSuspense(<Forbidden />),
      },
      {
        path: '404',
        element: withSuspense(<NotFound />),
      },
      {
        path: 'forbidden',
        element: <Navigate replace to='/403' />,
      },
      {
        path: '**',
        element: <Navigate replace to='/404' />,
      },
    ],
  },
]);

const App = () => (
  <RouterProvider router={router} />
);

export default App;
