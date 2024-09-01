import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toastInstance } from '../components/Toast';
import { createDomConfett } from '../components/DomConfett';
import { request } from '../lib/request';
import { PasswordInput } from '@/components/PasswordInput';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = { username: '', password: '', confirmPassword: '' };
  const validationSchemas = Yup.object().shape({
    username: Yup.string().required('请输入用户名').nullable(),
    password: Yup.string().required('请输入密码').nullable(),
    confirmPassword: Yup.string().required('请确认密码').nullable(),
  });

  const { Container: DomConfettContainer, confett } = createDomConfett();

  return (
    <Container>
      <Center mt={16}>
        <Box boxShadow='base' w='100%' maxWidth='400px' p={2}>
          <Text as='h1' textAlign='center' size='xl'>
            <DomConfettContainer>
              Hoteler系统注册
            </DomConfettContainer>
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas}
            validate={(values) => {
              const errors = {} as any;
              if (
                values.password
                && values.confirmPassword
                && values.password !== values.confirmPassword
              ) {
                errors.confirmPassword = '两次密码不一致';
              }

              return errors;
            }}
            onSubmit={async ({ username, password }, { setSubmitting }) => {
              const res = await request({
                url: '/api/v1/user',
                method: 'post',
                data: {
                  username,
                  password,
                },
              });

              if (res.status !== -1) {
                navigate('/login');
                toastInstance({
                  title: '成功',
                  description: '用户创建成功',
                  position: 'top-right',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                });
                confett();
              }
              setSubmitting(false);
            }}
          >
            {({
              errors,
              touched,
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl
                  marginTop={4}
                  isInvalid={!!errors.username && touched.username}
                >
                  <FormLabel htmlFor='username'>用户名</FormLabel>
                  <Input
                    id='username'
                    type='text'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  {!!errors.username && touched.username ? (
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  ) : (
                    <FormHelperText>请输入你的用户名</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  marginTop={4}
                  isInvalid={!!errors.password && touched.password}
                >
                  <FormLabel htmlFor='password'>密码</FormLabel>
                  <PasswordInput
                    id='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  ) : (
                    <FormHelperText>请输入你的密码</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  marginTop={4}
                  isInvalid={
                    !!errors.confirmPassword && touched.confirmPassword
                  }
                >
                  <FormLabel htmlFor='confirmPassword'>确认密码</FormLabel>
                  <PasswordInput
                    id='confirmPassword'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <FormErrorMessage>
                      {errors.confirmPassword}
                    </FormErrorMessage>
                  ) : (
                    <FormHelperText>请确认你的密码</FormHelperText>
                  )}
                </FormControl>

                <Button
                  w='100%'
                  mt={2}
                  type='submit'
                  colorScheme='teal'
                  isLoading={isSubmitting}
                  loadingText='提交中'
                  disabled={isSubmitting}
                >
                  注册
                </Button>
              </form>
            )}
          </Formik>
          <Box mt={6}>
            已有账号?
            <Box as='span' ml={2} color='teal.500'>
              <Link to='/login'>点此登录</Link>
            </Box>
          </Box>
        </Box>
      </Center>
    </Container>
  );
};

export default Register;
