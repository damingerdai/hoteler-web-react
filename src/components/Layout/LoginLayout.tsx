import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

export const LoginLayout = React.memo(() => (
  <>
    <Navbar />
    <Outlet />
  </>
));

LoginLayout.displayName = 'LoginLayout';
