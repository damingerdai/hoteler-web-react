import {
  Box, Menu, MenuButton, MenuItem, MenuList, Portal,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { MdExitToApp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks';
import { logout as requestLogout } from '../lib/request';
import { clearToken } from '../slices/TokenSlice';
import { fetchUser, resetState } from '../slices/UserSlice';

const UserProfle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.token);
  const { username } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (token && token.accessToken) {
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
    <Box>
      <Menu>
        <MenuButton textTransform='capitalize'>{ username }</MenuButton>
        <Portal>
          <MenuList>
            <MenuItem icon={<MdExitToApp />} onClick={() => logout()}>登出</MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </Box>
  );
};

export default UserProfle;
