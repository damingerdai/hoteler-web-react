import { SunIcon } from '@chakra-ui/icons';
import {
  Flex, Box, Button, Image, Text, Link,
} from '@chakra-ui/react';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import logo from '../react-logo.svg';

const Navbar = () => (

  <Flex p='9px 16px' w='100%' color='white' bg='cyan.500' h={16} flexWrap='wrap' alignItems='center'>
    <Image src={logo} w='26px' h='26px' />
    <Text ml='4px'>Hoteler</Text>
    <Link ml={1} as={ReactLink} to='/'>
      Dashboard
    </Link>
    <Box flexGrow={1} />

    <Button bg='cyan.500' variant='ghost' _hover={{ bg: 'cyan.500' }} _active={{ bg: 'cyan.500' }}>
      <SunIcon />
    </Button>
  </Flex>
);

export default Navbar;
