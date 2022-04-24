import { Center, VStack } from '@chakra-ui/react';
import React from 'react';

interface ErrorCodeProps {
  code: number;
  title?: string;
  message?: string;
}

const ErrorCode: React.FC<ErrorCodeProps> = ({ code, title, message }) => (
  <VStack>
    <Center p='20px 0' fontSize='150px'>{code}</Center>
    <Center m='0 0 16px' fontWeight='500' fontSize='20px' lineHeight='32px'>{title}</Center>
    <Center m='0 0 16px' fontWeight='400' fontSize='16px' lineHeight='28px'>{message}</Center>
  </VStack>
);

export default ErrorCode;
