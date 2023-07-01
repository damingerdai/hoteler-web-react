import { Box } from '@chakra-ui/react';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Navgation from '../Navgation';

export const CommonLayout = React.memo(() => (
  <>
    <Navbar />
    <Box overflow='hidden' zIndex='1' boxSizing='border-box' position='relative'>
      <Box
        width='180px'
        overflow='auto'
        borderRight='1px solid rgba(0, 0, 0, .12)'
        position='absolute'
        top='0'
        bottom='0'
        zIndex='4'
        outline='0'
        boxSizing='border-box'
        overflowY='auto'
      >
        <Navgation />
      </Box>
      <Box display='block' ml='180px' height='100%' width='calc(100vw - 240px)' overflow='auto'>
        <Outlet />
      </Box>
    </Box>
  </>
));

CommonLayout.displayName = 'CommonLayout';
