import { Center, CircularProgress } from '@chakra-ui/react';
import * as React from 'react';

export const Loading: React.FC = () => (
  <Center w='100%' h='100%' pos='absolute' boxSizing='border-box' opacity='0.5'>
    <CircularProgress isIndeterminate />
  </Center>
);
