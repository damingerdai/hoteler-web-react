import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { PasswordInput } from '../components/PasswordInput';
import { errorMessage, login, readToken, request } from '../lib/request';
import { toast } from '../lib/toast';

export default function Login({ register = false }: { register?: boolean }) {
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      username: Yup.string().trim().required('请输入用户名'),
      password: Yup.string().required('请输入密码'),
      confirmPassword: register
        ? Yup.string()
            .oneOf([Yup.ref('password')], '两次密码不一致')
            .required('请确认密码')
        : Yup.string()
    }),
    onSubmit: async ({ username, password }, helpers) => {
      helpers.setStatus(undefined);
      try {
        if (register) {
          await request({
            url: '/api/v1/user',
            method: 'post',
            data: { username, password }
          });
          toast.success('用户创建成功');
          navigate('/login');
        } else {
          await login(username, password);
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        helpers.setStatus(errorMessage(error));
      }
    }
  });
  if (readToken()) return <Navigate to="/dashboard" replace />;
  const field = (name: keyof typeof form.values) => ({
    ...form.getFieldProps(name),
    fullWidth: true,
    required: true,
    error: !!(form.touched[name] && form.errors[name]),
    helperText: form.touched[name] && form.errors[name]
  });
  return (
    <Container maxWidth="xs" sx={{ py: { xs: 4, sm: 10 } }}>
      <Paper sx={{ p: 4 }}>
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 3, textAlign: 'center' }}
        >
          Hoteler系统{register ? '注册' : '登录'}
        </Typography>
        <Box component="form" noValidate onSubmit={form.handleSubmit}>
          <Stack spacing={3}>
            {form.status && <Alert severity="error">{form.status}</Alert>}
            <TextField
              {...field('username')}
              label="用户名"
              autoComplete="username"
            />
            <PasswordInput
              {...field('password')}
              label="密码"
              autoComplete={register ? 'new-password' : 'current-password'}
            />
            {register && (
              <PasswordInput
                {...field('confirmPassword')}
                label="确认密码"
                autoComplete="new-password"
              />
            )}
            <Button
              type="submit"
              variant="contained"
              loading={form.isSubmitting}
            >
              {register ? '注册' : '登录'}
            </Button>
            <Link component={RouterLink} to={register ? '/login' : '/register'}>
              {register ? '已有账号？点此登录' : '没有账号？点此创建一个'}
            </Link>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
