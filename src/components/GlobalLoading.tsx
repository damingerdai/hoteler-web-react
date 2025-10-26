// /* eslint-disable react/jsx-props-no-spreading */
// import {
//   Box, Fade, Flex, Text, useColorModeValue,
// } from '@chakra-ui/react';
// import { FoldingCube } from './FoldingCube';

import { Box, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

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
      <Box mt='1rem'>
        <Box textAlign='center'>
          <Box>请稍等一下</Box>
          <Box color='teal.500' fontWeight='bold'>
            正在加载数据。。。
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default GlobalLoading;
