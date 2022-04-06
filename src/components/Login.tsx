import React from 'react';
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

const Login = () => (
  <Container>
    <Center mt={16}>
      <Box boxShadow='base' w='100%' maxWidth='400px' p={2}>
        <Text as='h2' textAlign='center'> Hoteler系统登录 </Text>
        <Formik
          initialValues={{ username: '', password: '' }}
          validate={(values: { username?: string, password?: string }) => {
            const errors = {} as { username?: string, password?: string };
            if (!values.username) {
              errors.username = '请输入用户名';
            }
            if (!values.password) {
              errors.password = '请输入密码';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={!!errors.username && touched.username}>
                <FormLabel htmlFor='username'>用户名</FormLabel>
                <Input id='username' type='text' onChange={handleChange} onBlur={handleBlur} value={values.username} />
                {!!errors.username && touched.username
                  ? <FormErrorMessage>请输入你的用户名</FormErrorMessage>
                  : <FormHelperText>请输入你的用户名</FormHelperText>}
              </FormControl>

              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor='password'>密码</FormLabel>
                <Input id='password' type='password' onChange={handleChange} onBlur={handleBlur} value={values.password} />
                {errors.password && touched.password
                  ? <FormErrorMessage>请输入你的密码</FormErrorMessage>
                  : <FormHelperText>请输入你的密码</FormHelperText>}
              </FormControl>
              <Button w='100%' mt={2} type='submit' colorScheme='teal' disabled={isSubmitting}>登陆</Button>
            </form>
          )}
        </Formik>

      </Box>
    </Center>
  </Container>
);

export default Login;
