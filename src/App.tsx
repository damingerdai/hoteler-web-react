import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import logo from './react-logo.svg';
import './App.scss';

function App() {
  return (
    <Flex bg="tomato" w="100%" p={4} color="white">
      <Image src={logo} w="26px" h="26px" />
      <Text ml="4px">Hoteler</Text>
    </Flex>
  );
}

export default App;
