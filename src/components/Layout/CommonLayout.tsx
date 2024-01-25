import { Box } from '@chakra-ui/react';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Navgation from '../Navgation';
import Sidebar from '../Sidebar';

export const CommonLayout = React.memo(() => (
  <>
    <Navbar showHamburgerIcon />
    <Box overflow='hidden' zIndex='1' boxSizing='border-box' position='relative' height='calc(100vh - 4rem)'>
      <Sidebar>
        <Navgation />
      </Sidebar>
      <Box as='main' ml={{ base: '0', sm: '180px' }} height='100%' overflow='auto'>
        <Outlet />
      </Box>
    </Box>
  </>
));

CommonLayout.displayName = 'CommonLayout';
