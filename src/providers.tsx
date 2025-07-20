import { ChakraProvider } from '@chakra-ui/react';
import { system } from './theme';

export const UIProvider = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={system}>
    {children}
  </ChakraProvider>
);
