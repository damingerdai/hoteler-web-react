import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Flex,
  Button,
  Image,
  Text,
  useColorMode,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSystemColorMode } from '../hooks/useSystemColorMode';
import logo from '../react-logo.svg';
import GithubIcon from './GithubIcon';
import RouterLink from './RouterLink';
import UserProfile from './UserProfile';
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks';
import { fetchUser } from '../slices/UserSlice';
import { PermissionEnum, User } from '../types';

interface IRoute {
  to: string;
  name: string;
  permission: boolean | ((user: User) => boolean) | string | string[];
}

const Routes: IRoute[] = [
  {
    to: '/dashboard',
    name: '仪表盘',
    permission: (user: User) => {
      const permissions = user.permissions.map((p) => p.name);
      if (permissions.includes(PermissionEnum.MANAGE_DASHBOARD)) {
        return true;
      }
      return false;
    },
  },
  {
    to: '/customer',
    name: '客户信息',
    permission: [PermissionEnum.MANAGE_CUSTOMER],
  },
  {
    to: '/room',
    name: '房间信息',
    permission: [PermissionEnum.MANAGE_ROOM],
  },
];

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  const user = useAppSelector((state) => state.user);
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const systemColorMode = useSystemColorMode();
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const viewTransitionAnimate = (event: React.MouseEvent<HTMLButtonElement>) => {
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      // eslint-disable-next-line no-restricted-globals
      Math.max(x, innerWidth - x),
      // eslint-disable-next-line no-restricted-globals
      Math.max(y, innerHeight - y),
    );
    const isDark = colorMode === 'dark';
    // @ts-ignore
    const transition = document.startViewTransition(() => {
      toggleColorMode();
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
        },
      );
    });
  };

  useEffect(() => {
    setColorMode(systemColorMode);
  }, [systemColorMode]);

  useEffect(() => {
    if (token && token.accessToken) {
      dispatch(fetchUser(token.accessToken));
    }
  }, [token]);

  useEffect(() => {
    if (user && user.id) {
      const routeList = Routes.filter((route) => {
        if (typeof route.permission === 'boolean') {
          return route.permission;
        } if (typeof route.permission === 'string') {
          return user.permissions.map((p) => p.name).includes(route.permission);
        } if (Array.isArray(route.permission)) {
          const userPermissionNames = user.permissions.map((p) => p.name);
          // eslint-disable-next-line no-restricted-syntax
          for (const p of route.permission) {
            if (!userPermissionNames.includes(p)) {
              return false;
            }
          }
          return true;
        } if (typeof route.permission === 'function') {
          return route.permission(user);
        }

        return true;
      });
      setRoutes(routeList);
    } else {
      setRoutes([] as IRoute[]);
    }
  }, [user]);

  return (
    <>
      <Flex
        p='8px 16px'
        w='100%'
        color='white'
        bg='cyan.500'
        h={16}
        flexWrap='wrap'
        alignItems='center'
      >
        <Image src={logo} w='26px' h='26px' />
        <Text ml='4px'>
          Hoteler
        </Text>
        {!isMobile && (
          <>
            {routes.map((r) => (
              <RouterLink key={r.to} to={r.to} name={r.name} />
            ))}
          </>
        )}

        <Spacer />

        <Button
          bg='cyan.500'
          variant='ghost'
          mr={4}
          _hover={{ bg: 'cyan.500' }}
          _active={{ bg: 'cyan.500' }}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            if (!document || !('startViewTransition' in document)) {
              toggleColorMode();
              return;
            }
            viewTransitionAnimate(event);
          }}
        >
          {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
        <GithubIcon />
        <UserProfile ml={4} />
      </Flex>
      {isMobile && (
        <Flex
          p='8px 16px'
          w='100%'
          color='white'
          bg='cyan.500'
          h={14}
          flexWrap='wrap'
          alignItems='center'
          justifyContent='space-around'
        >
          {routes.map((r: IRoute) => (
            <RouterLink key={r.to} to={r.to} name={r.name} />
          ))}
        </Flex>
      )}
    </>
  );
};

export default Navbar;
