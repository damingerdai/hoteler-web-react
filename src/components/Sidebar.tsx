import {
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Box,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import * as React from 'react';
import { siderbarAtom } from '../atom';

const Sidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [siderbar, setSiderbar] = useAtom(siderbarAtom);
  const isMobile = useBreakpointValue(
    { base: true, sm: false },
    { ssr: false },
  );

  if (isMobile) {
    return (
      <Drawer isOpen={siderbar} placement='left' onClose={() => setSiderbar(false)} returnFocusOnClose={false} autoFocus={false} size='full'>
        <DrawerOverlay />
        <DrawerContent>
          {children}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Box
      width='180px'
      overflow='auto'
      borderRight='1px solid rgba(0, 0, 0, .12)'
      position='absolute'
      top='0'
      bottom='0'
      zIndex='4'
      outline='0'
      boxSizing='border-box'
      overflowY='auto'
    >
      {children}
    </Box>
  );
};

export default Sidebar;
