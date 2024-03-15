import {
  Box, CloseButton, Divider, Flex, Text, useBreakpointValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import { IRoute, Routes } from '../lib/route';
import { fetchCurrenter } from '../slices/UserFetcher';
import NavItem from './NavItem';
import { siderbarAtom } from '../atom';

const Navgation: React.FC = () => {
  const atomSiderbarStatus = useAtom(siderbarAtom);
  const setSiderStatus = atomSiderbarStatus[1];
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const isMobile = useBreakpointValue(
    { base: true, sm: false },
    { ssr: false },
  );
  const getToken = () => {
    try {
      const userTokenStr = localStorage.getItem('user_token');
      const userToken = JSON.parse(userTokenStr ?? '') as { accessToken: string };
      return userToken;
    } catch (err) {
      return { accessToken: '' };
    }
  };
  const userToken = getToken();
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
    <Box h='100%' w='100%' pt='4' transition='3s ease'>
      {isMobile && (
        <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
          <Text fontSize='2xl' fontFamily='monospace' fontWeight='blod'>Hoteler Portal</Text>
          <CloseButton onClick={() => setSiderStatus(false)} />
        </Flex>
      )}
      <Box>
        {routes.map((r) => (
          <React.Fragment key={r.to}>
            <Box h={12} fontSize={16} lineHeight='24px'>
              <NavItem icon={r.icon} path={r.to}>{r.name}</NavItem>
            </Box>
            <Divider />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Navgation;
