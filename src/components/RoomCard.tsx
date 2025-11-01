import {
  Badge,
  Box,
  Button,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppDispatch } from '../lib/reduxHooks';
import { request } from '../lib/request';
import { fetchRooms, hideRoomById } from '../slices/RoomSlice';
import { CommonResponse } from '../types';
import { type Room } from '../types/room';
// import AddCustomerRoomModal from './AddCustomerRoomModal';
import ConfirmModal from './ConfirmModal';
import EditRoomModal from './EditRoomModal';
import { toaster } from "@/components/ui/toaster"

interface RoomCardProps {
  room: Room & { url?: string };
}

const RoomCard: React.FC<RoomCardProps> = (props) => {
  const { room } = props;
  const dispatch = useAppDispatch();

  const [blurValue, setBlurValue] = useState<string>('10px');

  const {
    open: isConfirmModalOpen,
    onOpen: onConfirmModalOpen,
    onClose: onConfirmModalClose,
  } = useDisclosure();

  const {
    open: isEditRoomModalOpen,
    onOpen: onEditRoomModalOpen,
    onClose: onEditRoomModalClose,
  } = useDisclosure();

  const {
    open: isAddCustomerRoomModalOpen,
    onOpen: onAddCustomerRoomModalOpen,
    onClose: onAddCustomerRoomModalClose,
  } = useDisclosure();

  const deleteRoom = async (roomId: string) => {
    const res = await request<CommonResponse>({
      url: `/api/v1/room/${roomId}`,
      method: 'delete',
    });
    if (res.status === 200) {
      toaster({
        title: '删除房间成功',
        description: '删除房间成功🚀',
        status: 'success',
        //...defaultToastOptions,
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
        filter='auto'
        blur={blurValue}
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
          <Image
            w='100%'
            loading='lazy'
            src={room.url}
            onLoad={() => {
              setTimeout(() => setBlurValue('0'), 1000);
            }}
          />
        </Box>
        <Box mt={4}>
          <Stack direction='row'  align='center'>
            <Button
              colorScheme='teal'
              disabled={isAddCustomerRoomModalOpen}
              onClick={onAddCustomerRoomModalOpen}
            >
              入住
            </Button>
            <Button
              colorScheme='orange'
              disabled={isEditRoomModalOpen}
              onClick={onEditRoomModalOpen}
            >
              修改
            </Button>
            <Button
              colorScheme='red'
              disabled={isConfirmModalOpen}
              onClick={onConfirmModalOpen}
            >
              删除
            </Button>
          </Stack>
        </Box>
      </Box>
      {/* <ConfirmModal
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
      <EditRoomModal
        isOpen={isEditRoomModalOpen}
        onClose={(res) => {
          onEditRoomModalClose();
          if (res === true) {
            dispatch(fetchRooms());
          }
        }}
        room={room}
      />
      <AddCustomerRoomModal
        isOpen={isAddCustomerRoomModalOpen}
        onClose={onAddCustomerRoomModalClose}
        room={room}
      /> */}
    </>
  );
};

export default RoomCard;
