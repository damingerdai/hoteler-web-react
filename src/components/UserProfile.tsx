import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks';
import { fetchUser } from '../slices/UserSlice';

const UserProfle = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  const { username } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
    }
  }, [token]);

  if (!username) {
    return null;
  }

  return (
    <Box>
      { username }
    </Box>
  );
};

export default UserProfle;
