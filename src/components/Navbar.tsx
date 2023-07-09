import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Flex,
  Button,
  Image,
  Text,
  useColorMode,
  Spacer,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import * as React from 'react';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useSystemColorMode } from '../hooks/useSystemColorMode';
import logo from '../react-logo.svg';
import GithubIcon from './GithubIcon';
import UserProfile from './UserProfile';
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks';
import { fetchUser } from '../slices/UserSlice';
import { siderbarAtom } from '../atom';

interface NavbarProps {
  showHamburgerIcon?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showHamburgerIcon = false }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  const systemColorMode = useSystemColorMode();
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  const [siderbar, setSiderbar] = useAtom(siderbarAtom);

  const viewTransitionAnimate = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
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
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
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

  return (
    <Flex
      p='8px 16px'
      w='100%'
      color='white'
      bg='teal.500'
      h={16}
      flexWrap='wrap'
      alignItems='center'
    >
      {showHamburgerIcon && (
        <IconButton
          color='white'
          display={{ base: 'blick', md: 'none' }}
          colorScheme='teal'
          bg='teal.500'
          _hover={{ bg: 'teal.500' }}
          _active={{ bg: 'teal.500' }}
          icon={<HamburgerIcon />}
          aria-label='hamburger menu'
          mr={2}
          onClick={() => {
            setSiderbar(!siderbar);
          }}
        />
      )}
      <Image src={logo} w='26px' h='26px' />
      <Text ml='4px'>Hoteler</Text>

      <Spacer />

      <Tooltip label='切换主题'>
        <Button
          bg='teal.500'
          variant='ghost'
          mr={4}
          _hover={{ bg: 'teal.500' }}
          _active={{ bg: 'teal.500' }}
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
      </Tooltip>
      <GithubIcon />
      <UserProfile ml={4} />
    </Flex>
  );
};

export default Navbar;
