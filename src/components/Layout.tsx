import { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useColorScheme,
  Alert
} from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon } from '@mui/icons-material';
import {
  Link,
  matchPath,
  Navigate,
  Outlet,
  useLocation,
  useNavigate
} from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';
import { fetchCurrenter } from '../slices/UserFetcher';
import { logout, readToken } from '../lib/request';
import { routes } from '../lib/route';
import GlobalLoading from './GlobalLoading';

export default function Layout() {
  const token = readToken();
  const { data, error, mutate } = useSWR(
    token ? ['/api/v1/user', token.accessToken] : null,
    () => fetchCurrenter()
  );
  const { cache } = useSWRConfig();
  const [open, setOpen] = useState(false);
  const { mode, systemMode, setMode } = useColorScheme();
  const location = useLocation();
  const navigate = useNavigate();
  if (!token) return <Navigate to="/login" replace />;
  if (error)
    return (
      <Alert
        severity="error"
        action={<Button onClick={() => mutate()}>重试</Button>}
      >
        无法加载用户权限
      </Alert>
    );
  if (!data) return <GlobalLoading />;
  const allowed = routes.filter(route =>
    data.data.permissions.some(
      permission => permission.name === route.permission
    )
  );
  const active = routes.find(route => matchPath(route.to, location.pathname));
  const dark = (mode === 'system' ? systemMode : mode) === 'dark';
  const navigation = (
    <Box sx={{ width: 240 }}>
      <Toolbar>
        <Typography variant="h6">Hoteler</Typography>
      </Toolbar>
      <List>
        {allowed.map(route => (
          <ListItemButton
            key={route.to}
            component={Link}
            to={route.to}
            selected={active === route}
            onClick={() => setOpen(false)}
          >
            <ListItemText primary={route.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="打开导航"
            onClick={() => setOpen(true)}
            sx={{ display: { md: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Hoteler · {active?.name || '酒店管理'}
          </Typography>
          <IconButton
            color="inherit"
            aria-label={dark ? '切换浅色模式' : '切换深色模式'}
            onClick={() => setMode(dark ? 'light' : 'dark')}
          >
            {dark ? <LightMode /> : <DarkMode />}
          </IconButton>
          <Avatar sx={{ width: 32, height: 32, mx: 1 }}>
            {data.data.username.slice(0, 1)}
          </Avatar>
          <Button
            color="inherit"
            onClick={() => {
              logout();
              for (const key of cache.keys()) cache.delete(key);
              navigate('/login', { replace: true });
            }}
          >
            登出
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        aria-label="主导航"
        sx={{ width: { md: 240 }, flexShrink: 0 }}
      >
        <Drawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {navigation}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: 240 }
          }}
        >
          {navigation}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, minWidth: 0, p: { xs: 2, sm: 3 } }}
      >
        <Toolbar />
        {active && !allowed.includes(active) ? (
          <Alert severity="warning">403 · 您没有访问此页面的权限</Alert>
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>
  );
}
