import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import React from 'react';
import { request } from '../lib/request';
import { defaultToastOptions } from '../theme';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreateUserInput {
  name: string;
  gender: string | null;
  cardId: string;
  phone: string;
}

const CreateUserModal: React.FC<CreateUserModalProps> = (props) => {
  const toast = useToast();
  const { isOpen, onClose } = props;

  const initialValues: CreateUserInput = {
    name: '',
    gender: 'M',
    cardId: '',
    phone: '',
  };

  const validationSchemas = Yup.object().shape({
    name: Yup.string().required('请输入客户名字').nullable(),
    gender: Yup.string().required('请选择客户性别').nullable(),
    cardId: Yup.string().email('hhhh').required('请输入身份证号码').nullable(),
    phone: Yup.string().required('请输入联系方式').nullable(),
  });

  const handleSubmit = async (values) => {
    const res = await request<
    { status: 200 } | { status: -1; error: { code: string; message: string } }
    >({
      url: '/api/v1/customer',
      method: 'post',
      data: values,
    });
    if (res.status === 200) {
      toast({
        title: '创建客户成功',
        description: '创建客户成功🚀',
        status: 'success',
        ...defaultToastOptions,
      });
      onClose();
    } else {
      toast({
        title: '创建客户失败',
        description: res.error.message ?? '创建客户失败😭',
        status: 'error',
        ...defaultToastOptions,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik
        initialValues={initialValues}
        validationSchemas={validationSchemas}
        validateOnBlur
        enableReinitialize
        validateOnChange
        validateOnMount
        onSubmit={handleSubmit}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form>
            <ModalContent>
              <ModalHeader>创建客户</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel htmlFor='name'>客户名字</FormLabel>
                  <Input
                    id='name'
                    type='text'
                    value={values.name}
                    isInvalid={!!errors.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {!!errors.name && touched.name ? (
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  ) : (
                    <FormHelperText>请输入客户名</FormHelperText>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel htmlFor='gender'>性别</FormLabel>
                  <Select
                    id='gender'
                    variant='outline'
                    value={values.gender as string}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option value='M'>男</option>
                    <option value='F'>女</option>
                  </Select>
                  {!!errors.gender && touched.gender ? (
                    <FormErrorMessage>{errors.gender}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel htmlFor='cardId'>身份证号码</FormLabel>
                  <Input
                    id='cardId'
                    type='number'
                    value={values.cardId}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {!!errors.cardId && touched.cardId ? (
                    <FormErrorMessage>{errors.cardId}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel htmlFor='phone'>联系方式</FormLabel>
                  <Input
                    id='phone'
                    type='tel'
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {!!errors.phone && touched.phone ? (
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                  ) : null}
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  关闭
                </Button>
                <Button type='submit' disabled={isSubmitting} variant='ghost'>
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

export default CreateUserModal;
