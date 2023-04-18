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
import React, { useEffect } from 'react';
import { useSystemColorMode } from '../hooks/useSystemColorMode';
import logo from '../react-logo.svg';
import GithubIcon from './GithubIcon';
import RouterLink from './RouterLink';
import UserProfile from './UserProfile';

const Navbar = () => {
  const systemColorMode = useSystemColorMode();
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const routes = [
    {
      to: '/dashboard',
      name: '仪表盘',
    },
    {
      to: '/customer',
      name: '客户信息',
    },
    {
      to: '/room',
      name: '房间信息',
    },
  ];

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
          {routes.map((r) => (
            <RouterLink key={r.to} to={r.to} name={r.name} />
          ))}
        </Flex>
      )}
    </>
  );
};

export default Navbar;
