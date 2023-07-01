import { Box, Divider } from '@chakra-ui/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { IRoute, Routes } from '../lib/route';
import RouterLink from './RouterLink';
import { fetchCurrenter } from '../slices/UserFetcher';

const Navgation: React.FC = () => {
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const userTokenStr = localStorage.getItem('user_token');
  const userToken = JSON.parse(userTokenStr ?? '') as { accessToken: string };
  const accessToken = userToken?.accessToken ?? '';
  const { data } = useSWR(['/api/user', accessToken], (url, token) => fetchCurrenter(token));
  const user = data?.data;

  useEffect(() => {
    if (user && user.id) {
      const routeList = Routes.filter((route) => {
        if (typeof route.permission === 'boolean') {
          return route.permission;
        }
        if (typeof route.permission === 'string') {
          return user.permissions.map((p) => p.name).includes(route.permission);
        }
        if (Array.isArray(route.permission)) {
          const userPermissionNames = user.permissions.map((p) => p.name);
          // eslint-disable-next-line no-restricted-syntax
          for (const p of route.permission) {
            if (!userPermissionNames.includes(p)) {
              return false;
            }
          }
          return true;
        }
        if (typeof route.permission === 'function') {
          return route.permission(user);
        }

        return true;
      });
      setRoutes(routeList);
    } else {
      setRoutes([]);
    }
    setRoutes(Routes);
  }, [user]);

  return (
    <Box h='100%' w='100%' p='4'>
      {routes.map((r) => (
        <React.Fragment key={r.to}>
          <Box h={12} fontSize={16} lineHeight='24px'>
            <RouterLink to={r.to} name={r.name} />
          </Box>
          <Divider />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Navgation;
