import { Box, Divider } from '@chakra-ui/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { IRoute, Routes } from '../lib/route';
import RouterLink from './RouterLink';

const Navgation: React.FC = () => {
  const [routes, setRoutes] = useState<IRoute[]>([]);

  useEffect(() => {
    setRoutes(Routes);
  });

  return (
    <Box h='100%' w='100%' p='4'>
      {routes.map((r) => (
        <>
          <Box key={r.to} h={12} fontSize={16} lineHeight='24px'>
            <RouterLink to={r.to} name={r.name} />
          </Box>
          <Divider />
        </>
      ))}
    </Box>
  );
};

export default Navgation;
