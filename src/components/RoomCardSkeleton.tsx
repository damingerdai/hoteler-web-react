import {
  Box, Flex, Skeleton, Stack,
} from '@chakra-ui/react';
import * as React from 'react';
import { memo } from 'react';

const RoomCardSkeleton: React.FC = memo(() => (
  <Box
    flex='1 1 50%'
    maxW='450px'
    width={{
      base: '100%',
      sm: '50%',
      md: '33%',
      lg: '25%',
    }}
  >
    <Box
      m={4}
      p={4}
      boxShadow='md'
      borderWidth='1px'
    >
      <Flex dir='column' align='flex-end'>
        <Skeleton h='30px' w='50px' />
        <Skeleton ml='1' h='20px' w='30px' />
      </Flex>
      <Box mt={4}>
        <Skeleton h='400px' w='100%' />
      </Box>
    </Box>
    <Box mt={4}>
      <Stack direction='row' spacing={4} align='center'>
        {Array.from({ length: 10 }, (_, idx) => idx)
          .map((i) => <Skeleton key={i} h={10} minW={10} />)}
      </Stack>
    </Box>
  </Box>
));

RoomCardSkeleton.displayName = 'RoomCardSkeleton';

export default RoomCardSkeleton;
