import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import { format } from '../lib/date';
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks';
import { request } from '../lib/request';
import { fetchCustomers } from '../slices/CustomerSlice';
import { defaultToastOptions } from '../theme';
import { CommonResponse } from '../types';
import { Room } from '../types/room';

interface AddCustomerRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room;
}

const AddCustomerRoomModal: React.FC<AddCustomerRoomModalProps> = (props) => {
  const { isOpen, onClose, room } = props;
  const dispatch = useAppDispatch();
  const { list: customerList } = useAppSelector((state) => state.customer);
  const toast = useToast();
  const currentDate = new Date();
  const nextDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
  const initialValues = {
    customerId: customerList[0]?.id,
    roomId: room.id,
    beginDate: format(currentDate, 'yyyy-MM-dd'),
    endDate: format(nextDate, 'yyyy-MM-dd'),
  };
  const validationSchemas = Yup.object().shape({
    customerId: Yup.string().required('请选择客户').nullable(),
    roomId: Yup.string().required('请选择房间').nullable(),
    beginDate: Yup.string().required('请选择开始时间').nullable(),
    endDate: Yup.string().required('请选择结束时间').nullable(),
  });
  const fetchCustomersCallback = useCallback(() => {
    if (!customerList || customerList.length === 0) {
      dispatch(fetchCustomers());
    }
  }, [customerList]);

  useEffect(() => {
    fetchCustomersCallback();
  });

  const handleSubmit = async (values) => {
    const res = await request<CommonResponse>({
      url: 'api/v1/customer-checkin-record',
      method: 'post',
      data: {
        ...values,
        beginDate: new Date(`${values.beginDate} 12:00:000`),
        endDate: new Date(`${values.endDate} 12:00:000`),
      },
    });

    if (res.status === 200) {
      toast({
        title: '入住成功',
        description: '入住客户成功🚀',
        status: 'success',
        ...defaultToastOptions,
      });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas}
        validateOnBlur
        enableReinitialize
        validateOnChange
        validateOnMount
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          isValid,
          isSubmitting,
          handleChange,
        }) => (
          <Form>
            <ModalContent>
              <ModalHeader>客人入住</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel htmlFor='customerId'>客户</FormLabel>
                  <Select
                    id='customerId'
                    value={values.customerId}
                    onChange={handleChange}
                  >
                    {customerList.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </Select>
                  {errors?.customerId ? (
                    <FormErrorMessage>请选择客户</FormErrorMessage>
                  ) : (
                    <FormHelperText>请选择客户</FormHelperText>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel htmlFor='roomId'>房间</FormLabel>
                  <Input
                    id='roomId'
                    type='text'
                    value={room.roomname}
                    readOnly
                  />
                  {errors?.roomId && (
                    <FormErrorMessage>
                      {errors.roomId ?? '请选择房间'}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel htmlFor='beginDate'>入住时间</FormLabel>
                  <Input
                    id='beginDate'
                    type='datetime'
                    value={values.beginDate}
                    readOnly
                  />
                  {errors?.beginDate && (
                    <FormErrorMessage>
                      {errors.roomId ?? '请选择入住时间'}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel htmlFor='endDate'>离开时间</FormLabel>
                  <Input
                    id='endDate'
                    type='datetime'
                    value={values.endDate}
                    readOnly
                  />
                  {errors?.endDate && (
                    <FormErrorMessage>
                      {errors.roomId ?? '请选择离开时间'}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme='blue'
                  mr={3}
                  onClick={onClose}
                >
                  关闭
                </Button>
                <Button
                  type='submit'
                  variant='ghost'
                  disabled={!isValid || isSubmitting}
                  isLoading={isSubmitting}
                >
                  确定
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCustomerRoomModal;
