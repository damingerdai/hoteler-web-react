import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import useSWR from 'swr';
import CreateCustomerModal from '../components/CreateCustomerModal';
import CustomerCard from '../components/CustomerCard';
import GlobalLoading from '../components/GlobalLoading';
import { ProtectRoute } from '../components/ProtectRoute';
import { fetchCustomers } from '../slices/CustomerFetcher';

const Customer: React.FC = () => {
  const {
    data: customers,
    isLoading,
    mutate,
  } = useSWR('api/v1/customers', fetchCustomers);

  const {
    isOpen: isCreateCustomerModalOpen,
    onOpen: onCreateCustomerModalOpen,
    onClose: onCreateCustomerModalClose,
  } = useDisclosure();

  if (isLoading) {
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
        {(customers?.length ?? 0) === 0 ? (
          <Center>没有客户</Center>
        ) : (
          customers?.map((c) => (
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
          ))
        )}
      </Flex>
      <CreateCustomerModal
        isOpen={isCreateCustomerModalOpen}
        onClose={(res) => {
          onCreateCustomerModalClose();
          if (res === true) {
            mutate();
          }
        }}
      />
    </Box>
  );
};

export default ProtectRoute(Customer);
