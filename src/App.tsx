import { lazy } from 'react';
import { Alert, Button, Container } from '@mui/material';
import {
  createBrowserRouter,
  isRouteErrorResponse,
  Link,
  Navigate,
  RouterProvider,
  useRouteError
} from 'react-router-dom';
import Layout from './components/Layout';
import Toast from './components/Toast';
import { withSuspense } from './components/WithSuspense';
import Login from './pages/Login';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Customer = lazy(() => import('./pages/Customer'));
const Room = lazy(() => import('./pages/Room'));
const User = lazy(() => import('./pages/User'));
function RouteError() {
  const error = useRouteError();
  return (
    <Container sx={{ py: 8 }}>
      <Alert severity="error">
        {isRouteErrorResponse(error) && error.status === 404
          ? '404 · 页面不存在'
          : '页面加载失败，请刷新重试'}
      </Alert>
      <Button component={Link} to="/">
        返回首页
      </Button>
    </Container>
  );
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: withSuspense(<Dashboard />) },
      { path: 'customer', element: withSuspense(<Customer />) },
      { path: 'room', element: withSuspense(<Room />) },
      { path: 'user', element: withSuspense(<User />) }
    ]
  },
  { path: '/login', element: <Login key="login" /> },
  { path: '/register', element: <Login key="register" register /> },
  {
    path: '/403',
    element: (
      <Alert severity="warning">
        403 · 没有访问权限 <Link to="/">返回首页</Link>
      </Alert>
    )
  },
  { path: '/forbidden', element: <Navigate to="/403" replace /> },
  {
    path: '*',
    element: (
      <Alert severity="info">
        404 · 页面不存在 <Link to="/">返回首页</Link>
      </Alert>
    )
  }
]);
export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toast />
    </>
  );
}
