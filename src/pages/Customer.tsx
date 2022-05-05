import {
  Box, Button, Divider, Flex, Portal, useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CreateUserModal from '../components/CreateUserModal';
import CustomerCard from '../components/CustomerCard';
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks';
import { fetchCustomers } from '../slices/CustomerSlice';
import { RequestStatus } from '../types';

const Customer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: customers, status: requestStatus } = useAppSelector((state) => state.customer);

  const {
    isOpen: isCreateUserModalOpen,
    onOpen: onCreateUserModalOpen,
    onClose: onCreateUserModalClose,
  } = useDisclosure();

  const openCreateUserModal = async () => {
    // eslint-disable-next-line no-console
    console.log('hello11');
    await onCreateUserModalOpen();
    // eslint-disable-next-line no-console
    console.log('hello');
  };

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(isCreateUserModalOpen);
  }, [isCreateUserModalOpen]);

  if (requestStatus === RequestStatus.LOADING) {
    return <Box>loading...</Box>;
  }

  return (
    <Box p='20px 40px'>
      <Flex p={2} justifyContent='right'>
        <Button colorScheme='teal' onClick={openCreateUserModal}>创建用户</Button>
      </Flex>
      <Divider />
      <Flex flexDir='row' flexWrap='wrap' boxSizing='border-box' alignContent='center' justifyContent='start'>
        { customers.map((c) => (
          <Box
            key={c.id}
            pl={2}
            pr={2}
            mb={2}
            flex='1 1 50%'
            maxW='450px'
            width={{
              base: '100%', sm: '50%', md: '33%', lg: '25%',
            }}
          >
            <CustomerCard customer={c} />
          </Box>
        ))}
      </Flex>
      <Portal>
        <CreateUserModal isOpen={isCreateUserModalOpen} onClose={() => onCreateUserModalClose()} />
      </Portal>
    </Box>
  );
};

export default Customer;
