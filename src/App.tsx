import React from 'react';
import {
  Box, Button, Flex, Image, Text, Link,
} from '@chakra-ui/react';
import { SunIcon } from '@chakra-ui/icons';
import { Routes, Route, Link as ReactLink } from 'react-router-dom';
import logo from './react-logo.svg';
import './App.scss';
import Login from './components/Login';

const Home = () => <Box>this is home</Box>;
const Home2 = () => <Box>this is home 2</Box>;

const App = () => (
  <>
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
    <Box as='section'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='home2' element={<Home2 />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Box>
  </>

);

export default App;
