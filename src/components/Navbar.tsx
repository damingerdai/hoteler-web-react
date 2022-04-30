import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Flex, Button, Image, Text, useColorMode, Spacer, useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import logo from '../react-logo.svg';
import RouterLink from './RouterLink';
import UserProfle from './UserProfile';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <>
      <Flex p='8px 16px' w='100%' color='white' bg='cyan.500' h={16} flexWrap='wrap' alignItems='center'>
        <Image src={logo} w='26px' h='26px' />
        <Text ml='4px'>Hoteler</Text>
        {!isMobile && (
          <>
            <RouterLink to='/dashboard' name='Dashborad' />
            <RouterLink to='/customer' name='Customer' />
            <RouterLink to='/room' name='Room' />
          </>
        )}

        <Spacer />

        <Button bg='cyan.500' variant='ghost' _hover={{ bg: 'cyan.500' }} _active={{ bg: 'cyan.500' }} onClick={toggleColorMode}>
          { colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
        <UserProfle />
      </Flex>
      { isMobile && (
        <Flex p='8px 16px' w='100%' color='white' bg='cyan.500' h={14} flexWrap='wrap' alignItems='center' justifyContent='space-around'>
          <RouterLink to='/dashboard' name='Dashborad' />
          <RouterLink to='/customer' name='Customer' />
          <RouterLink to='/room' name='Room' />
        </Flex>
      )}
    </>
  );
};

export default Navbar;
