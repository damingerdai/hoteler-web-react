import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Link,
  Paper,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { PersonOutlined } from '@mui/icons-material';
import { useFormik } from 'formik';
import {
  Link as RouterLink,
  Navigate,
  useNavigate
} from '@tanstack/react-router';
import * as Yup from 'yup';
import { PasswordInput } from '../components/password-input';
import { errorMessage, login, readToken, request } from '../lib/request';
import { toast } from '../lib/toast';

const AnimateBox = styled(Box)`
  @property --boxdeg {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  --boxdeg: 0deg;
  background: linear-gradient(
    var(--boxdeg),
    hsla(265, 100%, 94%, 1),
    hsla(265, 73%, 81%, 1),
    hsla(265, 59%, 46%, 1),
    hsla(249, 65%, 20%, 1)
  );
  animation: anime 6s linear infinite;
  @keyframes anime {
    0% {
      --boxdeg: 0deg;
    }
    25% {
      --boxdeg: 90deg;
    }
    50% {
      --boxdeg: 180deg;
    }
    75% {
      --boxdeg: 270deg;
    }
    100% {
      --boxdeg: 360deg;
    }
  }
`;

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
          navigate({ to: '/login' });
        } else {
          await login(username, password);
          navigate({ to: '/dashboard', replace: true });
        }
      } catch (error) {
        helpers.setStatus(errorMessage(error));
      }
    }
  });
  if (readToken()) {
    return <Navigate to="/dashboard" replace />;
  }
  const field = (name: keyof typeof form.values) => ({
    ...form.getFieldProps(name),
    fullWidth: true,
    required: true,
    error: !!(form.touched[name] && form.errors[name]),
    helperText: form.touched[name] && form.errors[name]
  });
  return (
    <Box
      sx={{
        display: 'grid',
        minHeight: '100svh',
        gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
        bgcolor: 'background.default'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: { xs: 'none', lg: 'block' },
          overflow: 'hidden'
        }}
      >
        <AnimateBox />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(1px)',
            p: 4,
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: '#ffffff',
              fontWeight: 800,
              textShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'rgba(255, 255, 255, 0.85)', mt: 2 }}
          >
            体验高效便捷的 Hoteler 智慧酒店管理系统
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: { xs: 3, md: 8, lg: 12 }
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 420,
            mx: 'auto',
            p: { xs: 3, sm: 4 },
            bgcolor: 'transparent'
          }}
        >
          <Box sx={{ mb: 4, textAlign: { xs: 'center', lg: 'left' } }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 800,
                color: 'primary.main',
                mb: 1
              }}
            >
              Hoteler系统{register ? '注册' : '登录'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {register
                ? '填写以下信息创建您的酒店管理账号'
                : '输入您的账号凭据以访问管理系统'}
            </Typography>
          </Box>
          <Box component="form" noValidate onSubmit={form.handleSubmit}>
            <Stack spacing={3}>
              {form.status && <Alert severity="error">{form.status}</Alert>}
              <TextField
                {...field('username')}
                label="用户名"
                autoComplete="username"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlined fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }
                }}
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
                size="large"
                variant="contained"
                loading={form.isSubmitting}
                sx={{ py: 1.5, fontSize: '0.95rem' }}
              >
                {register ? '注册' : '登录'}
              </Button>
              <Typography variant="body2" align="center" color="text.secondary">
                <Link
                  component={RouterLink}
                  to={register ? '/login' : '/register'}
                  underline="hover"
                  color="primary.main"
                  sx={{ fontWeight: 700 }}
                >
                  {register ? '已有账号？点此登录' : '没有账号？点此创建一个'}
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
