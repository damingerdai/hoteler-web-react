import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useAppDispatch } from '../lib/reduxHooks';
import { request } from '../lib/request';
import { fetchCustomers } from '../slices/CustomerSlice';
// import { defaultToastOptions } from '../theme';
import { CommonResponse, Customer } from '../types';
import ConfirmModal from './ConfirmModal';
import EditCustomerModal from './EditCustomerModal';

interface CustomerCardProps {
  customer: Customer;
  deleteCustomerChange?: () => void
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, deleteCustomerChange }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    isOpen: isConfirmModalOpen,
    onOpen: onConfirmModalOpen,
    onClose: onConfirmModalClose,
  } = useDisclosure();
  const {
    isOpen: isEditCustomerModalOpen,
    onOpen: onEditCustomerModalOpen,
    onClose: onEditCustomerModalClose,
  } = useDisclosure();

  const deleteCustomer = async (customerId: string | number) => {
    const res = await request<CommonResponse>({
      url: `/api/v1/customer/${customerId}`,
      method: 'delete',
    });
    if (res.status === 200) {
      onConfirmModalClose();
      toast({
        title: '删除客户成功',
        description: '删除客户成功🚀',
        status: 'success',
      });
      dispatch(fetchCustomers());
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
        <Flex direction='row'>
          <Avatar name={customer.name} />
          <Text ml={2} mt={2} fontSize='xl' fontWeight='bold'>
            {customer.name}
            {customer.gender === 'F' && (
              <Badge ml='1' fontSize='0.8em' colorScheme='green'>
                女
              </Badge>
            )}
            {customer.gender === 'M' && (
              <Badge ml='1' fontSize='0.8em' colorScheme='purple'>
                男
              </Badge>
            )}
          </Text>
        </Flex>

        <Stack direction='column' mt={4}>
          <Flex w='100%' direction='row' justifyContent='flex-end'>
            <Text fontWeight='bold'>手机号码：</Text>
            <Spacer />
            <Text>{customer.phone}</Text>
          </Flex>
          <Flex w='100%' direction='row' justifyContent='flex-end'>
            <Text fontWeight='bold'>身份证</Text>
            <Spacer />
            <Text>{customer.cardId}</Text>
          </Flex>
        </Stack>
        <Stack direction='row' spacing={4} mt={8}>
          <Button colorScheme='teal' variant='solid' onClick={onEditCustomerModalOpen}>
            修改
          </Button>
          <Button colorScheme='pink' variant='solid' onClick={onConfirmModalOpen}>
            删除
          </Button>
        </Stack>
      </Box>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={(confirm) => {
          if (confirm === true && customer.id) {
            deleteCustomer(customer.id);
            if (deleteCustomerChange) {
              deleteCustomerChange();
            }
          } else {
            onConfirmModalClose();
          }
        }}
        title='确定删除'
        description='一旦删除，将不能够恢复'
      />
      <EditCustomerModal
        isOpen={isEditCustomerModalOpen}
        customer={customer}
        onClose={(res) => {
          onEditCustomerModalClose();
          if (res === true) {
            dispatch(fetchCustomers());
          }
        }}
      />
    </>
  );
};

export default CustomerCard;
