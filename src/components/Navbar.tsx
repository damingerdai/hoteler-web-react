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
import React from 'react';
import logo from '../react-logo.svg';
import GithubIcon from './GithubIcon';
import RouterLink from './RouterLink';
import UserProfile from './UserProfile';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
        <Text ml='4px'>Hoteler</Text>
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
          _hover={{ bg: 'cyan.500' }}
          _active={{ bg: 'cyan.500' }}
          onClick={toggleColorMode}
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
