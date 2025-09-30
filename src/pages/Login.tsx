import {
  Box,
  Button,
  Center,
  Container,
  Field,
   Link as ChakraLink,
  Input,
  Text,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as React from 'react';
import { useEffect } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { fetchToken } from '../slices/TokenSlice';
import { setUsername } from '../slices/UserSlice';
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks';
import { PasswordInput } from "@/components/ui/password-input"
// import { Field, FieldRoot } from '@/components/ui/field';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.token);
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
          <Text as='h1' textAlign='center'>
            Hoteler系统登录
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
                <Field.Root
                  marginTop={4}
                  invalid={!!errors.username && touched.username}
                >
                  {/* < htmlFor='username'>用户名</FormLabel> */}
                  <Field.Label>
                    用户名 <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    id='username'
                    type='text'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  {!!errors.username && touched.username ? (
                    <Field.ErrorText>{errors.username}</Field.ErrorText>
                  ) : (
                    <Field.HelperText>请输入你的用户名</Field.HelperText>
                  )}
                </Field.Root>

                <Field.Root
                  marginTop={4}
                  invalid={!!errors.password && touched.password}
                >

                  <Field.Label>
                    密码 <Field.RequiredIndicator />
                  </Field.Label>
                  <PasswordInput
                    id='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (
                    <Field.ErrorText>请输入你的密码</Field.ErrorText>
                  ) : (
                    <Field.HelperText>请输入你的密码</Field.HelperText>
                  )}
                </Field.Root>
                <Button
                  w='100%'
                  mt={2}
                  type='submit'
                  colorScheme='teal'
                  loading ={isSubmitting}
                  loadingText='提交中'
                  disabled={(touched && !isValid) || isSubmitting}
                >
                  登陆
                </Button>
              </form>
            )}
          </Formik>
          <Box mt={8}>
            没有账号?
            <Box as='span' ml={2}>
              <ChakraLink asChild textDecoration='underline'><RouteLink to='/register'>点此创建一个</RouteLink></ChakraLink>
            </Box>
          </Box>
        </Box>
      </Center>
    </Container>
  );
};

export default Login;
