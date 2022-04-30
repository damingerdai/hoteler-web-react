import {
  Badge, Box, Button, Stack, Text,
} from '@chakra-ui/react';
import React from 'react';
import { Customer } from '../types';

interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => (
  <Box
    p='18px'
    boxShadow='md'
    borderWidth='1px'
    _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
  >
    <Text fontSize='xl' fontWeight='bold'>
      {customer.name}
      { customer.gender === 'F' && (
        <Badge ml='1' fontSize='0.8em' colorScheme='green'>
          女
        </Badge>
      )}
      { customer.gender === 'M' && (
        <Badge ml='1' fontSize='0.8em' colorScheme='purple'>
          男
        </Badge>
      )}
    </Text>
    <Stack direction='row' mt={4}>
      <Box>
        <Text>
          手机号码：
          {customer.phone}
        </Text>
        <Text>
          身份证：
          {customer.cardId}
        </Text>
      </Box>
    </Stack>
    <Stack direction='row' spacing={4} mt={8}>
      <Button colorScheme='teal' variant='solid'>
        修改
      </Button>
      <Button colorScheme='pink' variant='solid'>
        删除
      </Button>
    </Stack>
  </Box>
);

export default CustomerCard;
