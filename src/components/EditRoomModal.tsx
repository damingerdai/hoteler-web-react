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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Room } from '../types/room';
import { request } from '../lib/request';
import { CommonResponse } from '../types';
import { defaultToastOptions } from '../theme';

interface EditRoomModalProps {
  room: Room;
  isOpen: boolean;
  onClose: (val?: boolean | undefined) => void;
}

const EditRoomModal: React.FC<EditRoomModalProps> = ({
  isOpen,
  onClose,
  room,
}) => {
  const toast = useToast();
  const initialValues = {
    ...room,
  };

  const validationSchema = Yup.object().shape({
    roomname: Yup.string().required('请输入房间名字').nullable(),
    price: Yup.number().min(1).required('请输入房间价格').nullable(),
  });

  const closeEditRoomModal = (val?: boolean | undefined) => {
    onClose(val);
  };

  const handleSubmit = async (values) => {
    const res = await request<CommonResponse>({
      url: '/api/v1/room',
      method: 'put',
      data: values,
    });
    if (res.status === 200) {
      toast({
        title: '修改房间成功',
        description: '修改房间成功🚀',
        status: 'success',
        ...defaultToastOptions,
      });
    }
    closeEditRoomModal(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeEditRoomModal}>
      <ModalOverlay />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        enableReinitialize
        validateOnChange
        validateOnMount={false}
        onSubmit={handleSubmit}
      >
        {({
          values,
          isValid,
          errors,
          handleChange,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form>
            <ModalContent>
              <ModalHeader>修改客户</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel htmlFor='roomname'>房间名字</FormLabel>
                  <Input
                    id='roomname'
                    type='text'
                    value={values.roomname}
                    onChange={handleChange}
                    isInvalid={!!errors.roomname}
                  />
                  {errors.roomname ? (
                    <FormErrorMessage>{errors.roomname}</FormErrorMessage>
                  ) : (
                    <FormHelperText>请输入房间名</FormHelperText>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel htmlFor='price'>房间价格</FormLabel>
                  <NumberInput
                    id='price'
                    value={values.price}
                    min={0}
                    max={99999}
                    onChange={(n) => setFieldValue('price', n, true)}
                    isInvalid={!!errors.price}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  {errors.price ? (
                    <FormErrorMessage>{errors.price}</FormErrorMessage>
                  ) : (
                    <FormHelperText>请输入房间价格</FormHelperText>
                  )}
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() => closeEditRoomModal()}>
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

export default EditRoomModal;
