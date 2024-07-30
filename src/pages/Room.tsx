import {
  Box, Button, Center, Divider, Flex, useDisclosure,
} from '@chakra-ui/react';
import * as React from 'react';
import useSWR from 'swr';
import CreateRoomModal from '../components/CreateRoomModal';
import { ProtectRoute } from '../components/ProtectRoute';
import RoomCard from '../components/RoomCard';
import RoomCardSkeleton from '../components/RoomCardSkeleton';
import { fetchRooms } from '../slices/RoomFetcher';

const Room: React.FC = () => {
  const {
    data: rooms,
    isLoading,
    mutate,
  } = useSWR('/api/v1/rooms', fetchRooms);

  const {
    isOpen: isCreateRoomModalOpen,
    onOpen: onCreateRoomModalOpen,
    onClose: onCreateRoomModalClose,
  } = useDisclosure();

  return (
    <Box p='20px 40px'>
      <Flex p={2} justifyContent='right'>
        <Button colorScheme='teal' onClick={onCreateRoomModalOpen}>
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
        {isLoading
          && Array.from({ length: 4 }, (_, idx) => idx).map((i) => (
            <RoomCardSkeleton key={i} />
          ))}
        {!isLoading
          && (rooms?.length === 0 ? <Center w='100%' mt={4}>没有房间</Center> : rooms?.map((r, i) => (
            <Box
              key={r.id}
              pl={4}
              pr={4}
              mb={4}
              flex='1 1 50%'
              maxW='450px'
              width={{
                base: '100%',
                sm: '50%',
                md: '33%',
                lg: '25%',
              }}
            >
              <RoomCard
                room={{
                  ...r,
                  url: `https://picsum.photos/200/300?random=${i}`,
                }}
              />
            </Box>
          )))}
      </Flex>
      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        onClose={(res) => {
          onCreateRoomModalClose();
          if (res === true) {
            mutate();
          }
        }}
      />
    </Box>
  );
};

export default ProtectRoute(Room);
