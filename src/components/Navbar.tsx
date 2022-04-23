import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Flex, Box, Button, Image, Text, useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import logo from '../react-logo.svg';
import RouterLink from './RouterLink';
import UserProfle from './UserProfile';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex p='9px 16px' w='100%' color='white' bg='cyan.500' h={16} flexWrap='wrap' alignItems='center'>
      <Image src={logo} w='26px' h='26px' />
      <Text ml='4px'>Hoteler</Text>
      <RouterLink to='/dashboard' name='Dashborad' />
      <RouterLink to='/customer' name='Customer' />
      <RouterLink to='/room' name='Room' />
      <Box flexGrow={1} />

      <Button bg='cyan.500' variant='ghost' _hover={{ bg: 'cyan.500' }} _active={{ bg: 'cyan.500' }} onClick={toggleColorMode}>
        { colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
      </Button>
      <UserProfle />
    </Flex>
  );
};

export default Navbar;
