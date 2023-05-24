/* eslint-disable react/jsx-props-no-spreading */
import {
  Box, Fade, Flex, Text, useColorModeValue,
} from '@chakra-ui/react';
import { FoldingCube } from './FoldingCube';

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
      <FoldingCube />
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
