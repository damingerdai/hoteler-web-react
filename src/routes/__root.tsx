import { Alert, Button, Container } from '@mui/material';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import Toast from '../components/Toast';

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toast />
    </>
  );
}

function RouteError() {
  return (
    <Container sx={{ py: 8 }}>
      <Alert severity="error">页面加载失败，请刷新重试</Alert>
      <Button component={Link} to="/">
        返回首页
      </Button>
    </Container>
  );
}

function NotFound() {
  return (
    <Alert severity="info">
      404 · 页面不存在 <Link to="/">返回首页</Link>
    </Alert>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: RouteError,
  notFoundComponent: NotFound
});
