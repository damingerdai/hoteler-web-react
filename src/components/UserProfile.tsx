/* eslint-disable react/jsx-props-no-spreading */
import {
  Avatar,
  Box, BoxProps, Button, Menu, Portal,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { MdExitToApp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks';
import { logout as requestLogout } from '../lib/request';
import { clearToken } from '../slices/TokenSlice';
import { fetchUser, resetState } from '../slices/UserSlice';
import { MenuTrigger, MenuItem } from './ui/menu';

const UserProfile: React.FC<BoxProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.token);
  const { username } = useAppSelector((state) => state.user);

  useEffect(() => {
    const tokenString = localStorage.getItem('user_token');
    if (tokenString || (token && token.accessToken)) {
      dispatch(fetchUser(token.accessToken));
    }
  }, [token]);

  const logout: () => void = () => {
    dispatch(clearToken());
    dispatch(resetState());
    requestLogout();
    navigate('/login');
  };

  return (
    <Box {...props}>
      {username
        && (
          <Menu.Root>
            <MenuTrigger>
              <Button variant="outline" size="sm">
                       <Avatar.Root>
               <Avatar.Fallback name={username} />
                {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
               </Avatar.Root>
              </Button>
            </MenuTrigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                    <MenuItem onClick={() => logout()}>登出</MenuItem>
  
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          // <Menu.Root>
          //   <Menu.Trigger asChild>
          //     <Button variant="outline" size="sm">
          //       Open
          //     </Button>
          //   </Menu.Trigger>
          //   <MenuButton>
          //     <Avatar.Root>
          //       <Avatar.Fallback name={username} />
          //       {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
          //     </Avatar.Root>
          //   </MenuButton>
          //   <Portal>
          //     <MenuList>
          //       <MenuItem icon={<MdExitToApp />} onClick={() => logout()}>登出</MenuItem>
          //     </MenuList>
          //   </Portal>
          // </Menu.Root>
        )}
    </Box>
  );
};

export default UserProfile;
