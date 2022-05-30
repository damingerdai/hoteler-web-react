import {
  Badge, Box, Button, Image, Stack, Text,
} from '@chakra-ui/react';
import React from 'react';
import { Room } from '../types/room';

interface RoomCardProps {
  room: Room & { url?: string }
}

const RoomCard: React.FC<RoomCardProps> = (props) => {
  const { room } = props;

  return (
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
          <Badge ml='1' fontSize='0.8em' variant='subtle' colorScheme='purple'>
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
          <Button colorScheme='red'>删除</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default RoomCard;
