import { Box, Heading } from '@chakra-ui/react';
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
  >
    <Heading fontSize='xl'>
      {customer.name}
    </Heading>
    {customer.phone}
  </Box>
);

export default CustomerCard;
