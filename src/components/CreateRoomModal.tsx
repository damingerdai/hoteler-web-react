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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { CommonResponse } from '../types';
import { request } from '../lib/request';
import { defaultToastOptions } from '../theme';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: (val?: boolean | undefined) => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = (props) => {
  const { isOpen, onClose } = props;
  const toast = useToast();

  const initialValues = {
    roomname: '',
    price: 200,
  };

  const validationSchema = Yup.object().shape({
    roomname: Yup.string().required('请输入房间名字').nullable(),
    price: Yup.number().min(1).required('请输入房间价格').nullable(),
  });

  const handleSubmit = async (values) => {
    const res = await request<CommonResponse>({
      url: '/api/v1/room',
      method: 'post',
      data: values,
    });
    if (res.status === 200) {
      toast({
        title: '创建房间成功',
        description: '创建房间成功🚀',
        status: 'success',
        ...defaultToastOptions,
      });
    }
    onClose(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          values, isValid, errors, handleChange, setFieldValue, isSubmitting,
        }) => (
          <Form>
            <ModalContent>
              <ModalHeader>创建房间</ModalHeader>
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
                    <FormHelperText>请输入客户名</FormHelperText>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel htmlFor='price'>房间价格</FormLabel>
                  <NumberInput id='price' value={values.price} min={0} max={99999} onChange={(n) => setFieldValue('price', n, true)} isInvalid={!!errors.price}>
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
                <Button variant='ghost' mr={3} onClick={() => onClose(false)}>
                  关闭
                </Button>
                <Button type='submit' colorScheme='teal' disabled={!isValid || isSubmitting} isLoading={isSubmitting}>
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

export default CreateRoomModal;
