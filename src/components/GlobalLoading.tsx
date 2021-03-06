/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box, Fade, Flex, Text, useColorModeValue,
} from '@chakra-ui/react';
import '../styles/preloader.css';

const GlobalLoading = ({ ...rest }) => {
  const bg = useColorModeValue('white', 'gray.700');

  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      h='100vh'
      w='100vw'
      flexDir='column'
      position='fixed'
      zIndex='100'
      top={0}
      left={0}
      background={bg}
      px='1rem'
      {...rest}
    >
      <div className='sk-folding-cube'>
        <div className='sk-cube1 sk-cube' />
        <div className='sk-cube2 sk-cube' />
        <div className='sk-cube4 sk-cube' />
        <div className='sk-cube3 sk-cube' />
      </div>
      <Fade in>
        <Box mt='1rem'>
          <Box textAlign='center'>
            <Text>请稍等一下</Text>
            <Text color='teal.500' fontWeight='bold'>
              正在加载数据。。。
            </Text>
          </Box>
        </Box>
      </Fade>
    </Flex>
  );
};

export default GlobalLoading;
