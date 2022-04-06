import React from 'react';
import {
  Box, Button, Flex, Image, Text,
} from '@chakra-ui/react';
import { SunIcon } from '@chakra-ui/icons';
import logo from './react-logo.svg';
import './App.scss';
import Login from './components/Login';

const App = () => (
  <>
    <Flex p='9px 16px' w='100%' color='white' bg='cyan.500' h={16} flexWrap='wrap' alignItems='center'>
      <Image src={logo} w='26px' h='26px' />
      <Text ml='4px'>Hoteler</Text>

      <Box flexGrow={1} />

      <Button bg='cyan.500' variant='ghost' _hover={{ bg: 'cyan.500' }} _active={{ bg: 'cyan.500' }}>
        <SunIcon />
      </Button>
    </Flex>
    <Box as='section'>
      <Login />
    </Box>
  </>

);

export default App;
