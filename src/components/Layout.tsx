import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export const Layout = React.memo(() => (
  <>
    <Navbar />
    <Outlet />
  </>
));

Layout.displayName = 'Layout';
