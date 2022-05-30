import {
  Box, Button, Divider, Flex, useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CreateRoomModal from '../components/CreateRoomModal';
import GlobalLoading from '../components/GlobalLoading';
import RoomCard from '../components/RoomCard';
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks';
import { fetchRooms } from '../slices/RoomSlice';
import { RequestStatus } from '../types';

const Room: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: rooms, status: requestStatus } = useAppSelector(
    (state) => state.room,
  );

  const {
    isOpen: isCreateRoomModalOpen,
    onOpen: onCreateRoomModalOpen,
    onClose: onCreateRoomModalClose,
  } = useDisclosure();

  useEffect(() => {
    dispatch(fetchRooms());
  }, []);

  const closeCreateRoomModal = () => {
    onCreateRoomModalOpen();
    dispatch(fetchRooms());
  };

  if (requestStatus === RequestStatus.LOADING) {
    return <GlobalLoading />;
  }

  return (
    <Box p='20px 40px'>
      <Flex p={2} justifyContent='right'>
        <Button colorScheme='teal' onClick={closeCreateRoomModal}>
          创建房间
        </Button>
      </Flex>
      <Divider />

      <Flex
        flexDir='row'
        flexWrap='wrap'
        boxSizing='border-box'
        alignContent='center'
        justifyContent='start'
        mt='16px'
      >
        {rooms.map((r, i) => (
          <Box
            key={r.id}
            pl={2}
            pr={2}
            mb={2}
            flex='1 1 50%'
            maxW='450px'
            width={{
              base: '100%',
              sm: '50%',
              md: '33%',
              lg: '25%',
            }}
          >
            <RoomCard room={{ ...r, url: `https://picsum.photos/200/300?random=${i}` }} />
          </Box>
        ))}
      </Flex>
      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        onClose={onCreateRoomModalClose}
      />
    </Box>
  );
};

export default Room;
