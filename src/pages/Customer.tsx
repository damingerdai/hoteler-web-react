import {
  Box,
  Button,
  Divider,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CreateCustomerModal from '../components/CreateCustomerModal';
import CustomerCard from '../components/CustomerCard';
import GlobalLoading from '../components/GlobalLoading';
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks';
import { fetchCustomers } from '../slices/CustomerSlice';
import { RequestStatus } from '../types';

const Customer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: customers, status: requestStatus } = useAppSelector(
    (state) => state.customer,
  );

  const {
    isOpen: isCreateCustomerModalOpen,
    onOpen: onCreateCustomerModalOpen,
    onClose: onCreateCustomerModalClose,
  } = useDisclosure();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  if (requestStatus === RequestStatus.LOADING) {
    return <GlobalLoading />;
  }

  return (
    <Box p='20px 40px'>
      <Flex p={2} justifyContent='right'>
        <Button colorScheme='teal' onClick={onCreateCustomerModalOpen}>
          创建客户
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
        {customers.map((c) => (
          <Box
            key={c.id}
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
            <CustomerCard customer={c} />
          </Box>
        ))}
      </Flex>
      <CreateCustomerModal
        isOpen={isCreateCustomerModalOpen}
        onClose={(res) => {
          onCreateCustomerModalClose();
          if (res === true) {
            dispatch(fetchCustomers());
          }
        }}
      />
    </Box>
  );
};

export default Customer;
