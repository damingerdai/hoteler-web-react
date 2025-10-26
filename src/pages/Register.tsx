import {
  Box,
  Button,
  Center,
  Container,
  Field,
  Input,
  Text,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createDomConfett } from '../components/DomConfett';
import { request } from '../lib/request';
import { toaster } from '@/components/ui/toaster';
import { PasswordInput } from '@/components/ui/password-input';

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
          <Text as='h1' textAlign='center'>
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
                setTimeout(() => {
                   navigate('/login');
                }, 3000);
                toaster.create({
                  title: '成功',
                  description: '用户创建成功',
                  type: 'success'
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
              isValid,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Field.Root
                id="username"
                  name="username"
                  marginTop={4}
                  invalid={!!errors.username && touched.username}
                >
                  <Field.Label >用户名</Field.Label>
                  <Input
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
                 id='password'
                 nme="password"
                  marginTop={4}
                  invalid={!!errors.password && touched.password}
                >
                  <Field.Label >密码</Field.Label>
                  <PasswordInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (
                    <Field.ErrorText>{errors.username}</Field.ErrorText>
                  ) : (
                    <Field.HelperText>请输入你的密码</Field.HelperText>
                  )}
                </Field.Root>

                <Field.Root
                  id='confirmPassword'
                    name="confirmPassword"
                  marginTop={4}
                  invalid={
                    !!errors.confirmPassword && touched.confirmPassword
                  }
                >
                  <Field.Label >确认密码</Field.Label>
                  <PasswordInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <Field.ErrorText>
                      {errors.confirmPassword}
                    </Field.ErrorText>
                  ) : (
                    <Field.HelperText>请确认你的密码</Field.HelperText>
                  )}
                </Field.Root>

                <Button
                  w='100%'
                  mt={2}
                  type='submit'
                  colorScheme='teal'
                  loading={isSubmitting}
                  loadingText='提交中'
                   disabled={(touched && !isValid) || isSubmitting}
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
