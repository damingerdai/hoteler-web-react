import { useState, type ReactNode } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useColorScheme,
  Alert
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  DarkMode,
  DashboardRounded,
  HotelRounded,
  LightMode,
  ManageAccountsRounded,
  Menu as MenuIcon,
  PeopleAltRounded
} from '@mui/icons-material';
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
import { BRAND_GRADIENT } from '../theme';
import GlobalLoading from './GlobalLoading';

const routeIcons: Record<string, ReactNode> = {
  '/dashboard': <DashboardRounded />,
  '/customer': <PeopleAltRounded />,
  '/room': <HotelRounded />,
  '/user': <ManageAccountsRounded />
};

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
      <Toolbar
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            letterSpacing: 0.5,
            color: 'primary.main'
          }}
        >
          Hoteler
        </Typography>
      </Toolbar>
      <List sx={{ p: 1.5 }}>
        {allowed.map(route => {
          const isSelected = active === route;
          return (
            <ListItem key={route.to} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={route.to}
                selected={isSelected}
                onClick={() => setOpen(false)}
                sx={theme => ({
                  borderRadius: 2,
                  px: 2,
                  minHeight: 48,
                  gap: 1,
                  color: isSelected
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                  '&.Mui-selected': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.16)
                    }
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.primary.main,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.main
                    }
                  }
                })}
              >
                {routeIcons[route.to] && (
                  <ListItemIcon
                    sx={{
                      color: isSelected ? 'primary.main' : 'text.secondary',
                      minWidth: 36
                    }}
                  >
                    {routeIcons[route.to]}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={route.name}
                  slotProps={{
                    primary: {
                      sx: { fontWeight: isSelected ? 600 : 500 }
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          background: BRAND_GRADIENT,
          boxShadow: 'none'
        }}
      >
        <Toolbar
          sx={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <IconButton
            color="inherit"
            aria-label="打开导航"
            onClick={() => setOpen(true)}
            sx={{ display: { md: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Box component="span" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
              Hoteler
            </Box>
            <Box
              component="span"
              sx={{ opacity: 0.85, fontWeight: 400, ml: 1 }}
            >
              · {active?.name || '酒店管理'}
            </Box>
          </Typography>
          <IconButton
            color="inherit"
            aria-label={dark ? '切换浅色模式' : '切换深色模式'}
            onClick={() => setMode(dark ? 'light' : 'dark')}
          >
            {dark ? <LightMode /> : <DarkMode />}
          </IconButton>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              mx: 1,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              fontWeight: 700
            }}
          >
            {data.data.username.slice(0, 1).toUpperCase()}
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
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider'
            }
          }}
        >
          {navigation}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 2, sm: 4 },
          bgcolor: 'background.default'
        }}
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
