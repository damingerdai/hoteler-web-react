import {
  Box,
  CloseButton,
  Flex,
  VStack,
  IconButton,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Divider,
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
  const navitemHoverBgaColor = useColorModeValue('gray.200', 'blackAlpha.600');
  const getToken = () => {
    try {
      const userTokenStr = localStorage.getItem('user_token');
      const userToken = JSON.parse(userTokenStr ?? '') as {
        accessToken: string;
      };
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
    <Box h='100%' w='100%' p={4} pt={2} transition='3s ease'>
      {isMobile && (
        <Flex
          h='14'
          alignItems='center'
          p='2'
          justifyContent='space-between'
          borderEndWidth='1px'
          borderBottomWidth='1px'
          borderBottomColor='blackAlpha.200'
        >
          <Text fontSize='2xl' fontWeight='blod'>
            Hoteler Portal
          </Text>
          <IconButton
            icon={<CloseButton />}
            onClick={() => setSiderStatus(false)}
            aria-label='close navgation'
          />
        </Flex>
      )}
      <VStack alignItems='normal'>
        {routes.map((r) => (
          <React.Fragment key={r.to}>
            <Box key={r.to} h={12} fontSize={16} _hover={{ bg: navitemHoverBgaColor }}>
              <NavItem icon={r.icon} path={r.to}>
                {r.name}
              </NavItem>
            </Box>
            <Divider />
          </React.Fragment>
        ))}
      </VStack>
    </Box>
  );
};

export default Navgation;
