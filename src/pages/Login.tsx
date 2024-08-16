import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { fetchToken } from '../slices/TokenSlice';
import { setUsername } from '../slices/UserSlice';
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.token);
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = { username: '', password: '' };
  const validationSchemas = Yup.object().shape({
    username: Yup.string().required('请输入用户名').nullable(),
    password: Yup.string().required('请输入密码').nullable(),
  });

  useEffect(() => {
    if (token && token.accessToken) {
      navigate('/dashboard');
    }
  }, [token]);

  return (
    <Container>
      <Center mt={16}>
        <Box boxShadow='base' w='100%' maxWidth='400px' p={2}>
          <Text as='h1' textAlign='center' size='xl'>
            {' '}
            Hoteler系统登录
            {' '}
          </Text>
          <Formik
            initialValues={initialValues}
            // eslint-disable-next-line react/jsx-props-no-multi-spaces
            validationSchema={validationSchemas}
            onSubmit={async ({ username, password }, { setSubmitting }) => {
              await dispatch(fetchToken({ username, password }));
              dispatch(setUsername(username));
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
              /* and other goodies */
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
                  <InputGroup>
                    <Input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />

                    <InputRightElement>
                      <IconButton
                        aria-label='switch password mode'
                        icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && touched.password ? (
                    <FormErrorMessage>请输入你的密码</FormErrorMessage>
                  ) : (
                    <FormHelperText>请输入你的密码</FormHelperText>
                  )}
                </FormControl>
                <Button
                  w='100%'
                  mt={2}
                  type='submit'
                  colorScheme='teal'
                  isLoading={isSubmitting}
                  loadingText='提交中'
                  isDisabled={(touched && !isValid) || isSubmitting}
                >
                  登陆
                </Button>
              </form>
            )}
          </Formik>
          <Box mt={8}>
            没有账号?
            <Box as='span' ml={2} color='teal.500'>
              <RouteLink to='/register'>点此创建一个</RouteLink>
            </Box>
          </Box>
        </Box>
      </Center>
    </Container>
  );
};

export default Login;
