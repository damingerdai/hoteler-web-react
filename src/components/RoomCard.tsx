import {
  Badge, Box, Button, Image, Stack, Text, useDisclosure, useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useAppDispatch } from '../lib/reduxHooks';
import { request } from '../lib/request';
import { hideRoomById } from '../slices/RoomSlice';
import { defaultToastOptions } from '../theme';
import { CommonResponse } from '../types';
import { Room } from '../types/room';
import ConfirmModal from './ConfirmModal';

interface RoomCardProps {
  room: Room & { url?: string };
}

const RoomCard: React.FC<RoomCardProps> = (props) => {
  const { room } = props;
  const dispatch = useAppDispatch();

  const toast = useToast();

  const {
    isOpen: isConfirmModalOpen,
    onOpen: onConfirmModalOpen,
    onClose: onConfirmModalClose,
  } = useDisclosure();

  const deleteRoom = async (roomId: string) => {
    const res = await request<CommonResponse>({
      url: `/api/v1/room/${roomId}`,
      method: 'delete',
    });
    if (res.status === 200) {
      toast({
        title: '删除房间成功',
        description: '删除房间成功🚀',
        status: 'success',
        ...defaultToastOptions,
      });
      dispatch(hideRoomById(roomId));
    }
  };

  return (
    <>
      <Box
        p='18px'
        boxShadow='md'
        borderWidth='1px'
        _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
      >
        <Text fontSize='xl' fontWeight='bold'>
          {room.roomname}
          {room.status === 1 && (
            <Badge ml='1' fontSize='0.8em' variant='subtle' colorScheme='green'>
              空闲
            </Badge>
          )}
          {room.status === 2 && (
            <Badge
              ml='1'
              fontSize='0.8em'
              variant='subtle'
              colorScheme='purple'
            >
              占用
            </Badge>
          )}
        </Text>
        <Box w='100%' mt={4}>
          <Image w='100%' src={room.url} />
        </Box>
        <Box mt={4}>
          <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='teal'>入住</Button>
            <Button colorScheme='orange'>修改</Button>
            <Button colorScheme='red' disabled={isConfirmModalOpen} onClick={onConfirmModalOpen}>删除</Button>
          </Stack>
        </Box>
      </Box>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={(confirm) => {
          if (confirm === true && room.id) {
            deleteRoom(room.id);
          }
          onConfirmModalClose();
        }}
        title='确定删除'
        description='一旦删除，将不能够恢复'
      />
    </>
  );
};

export default RoomCard;
