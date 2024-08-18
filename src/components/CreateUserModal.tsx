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
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { request } from '@/lib';
import { toastInstance } from './Toast';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = (props) => {
  const { isOpen, onClose } = props;

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchemas = Yup.object().shape({
    username: Yup.string().required('请输入用户名字').nullable(),
    password: Yup.string().required('请输入密码'),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas}
        validateOnBlur
        validateOnChange
        validateOnMount
        enableReinitialize
        onSubmit={async (values) => {
          const { username, password } = values;
          try {
            const res = await request({
              url: 'api/v1/user',
              method: 'post',
              data: {
                username,
                password,
              },
            });
            if (res.status !== -1) {
              toastInstance({
                title: '成功',
                description: '用户创建成功',
                position: 'top-right',
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
              onClose();
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form>
            <ModalContent>
              <ModalHeader>创建用户</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel htmlFor='username'>用户名</FormLabel>
                  <Input
                    id='username'
                    type='text'
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {!!errors.username && touched.username ? (
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  ) : (
                    <FormHelperText>请输入用户名</FormHelperText>
                  )}
                </FormControl>
                <FormControl mt='4'>
                  <FormLabel htmlFor='password'>密码</FormLabel>
                  <Input
                    id='password'
                    type='text'
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {!!errors.password && touched.password ? (
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  ) : (
                    <FormHelperText>请输入密码</FormHelperText>
                  )}
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button variant='ghost' mr={3} onClick={onClose}>
                  关闭
                </Button>
                <Button
                  type='submit'
                  colorScheme='teal'
                  isDisabled={!isValid || isSubmitting}
                  isLoading={isSubmitting}
                >
                  提交
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
