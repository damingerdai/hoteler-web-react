import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  type AnyRoute
} from '@tanstack/react-router';
import { SWRConfig } from 'swr';
import { ThemeProvider } from '@mui/material';
import type { ReactNode } from 'react';
import type { AxiosRequestConfig } from 'axios';
import { client, readToken } from './lib/request';
import { theme } from './theme';
import Login from './pages/login-page';
import Customer from './pages/customer-page';
import Room from './pages/room-page';
import User from './pages/user-page';
import Dashboard from './pages/dashboard-page';
import Layout from './components/comm-layout';
import AddCustomerRoomModal from './components/add-customer-room-modal';

vi.mock('react-apexcharts', () => ({
  default: ({ series }: { series: unknown }) => (
    <div data-testid="chart">{JSON.stringify(series)}</div>
  )
}));
const customer = {
  id: 1,
  name: '张三',
  gender: 'M',
  phone: '13800138000',
  cardId: '123456'
};
const room = { id: 'r1', roomname: '101', price: 200, status: 1 };
let calls: AxiosRequestConfig[];
let customers: (typeof customer)[];
let rooms: (typeof room)[];
let users: { id: string; username: string }[];
let failDelete: boolean;
let permissions: string[];

beforeEach(() => {
  calls = [];
  customers = [{ ...customer }];
  rooms = [{ ...room }];
  users = [{ id: 'u1', username: 'admin' }];
  failDelete = false;
  permissions = ['manage_room'];
  client.defaults.adapter = async config => {
    calls.push(config);
    const body =
      typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
    let data: unknown = { status: 200 };
    switch (`${config.method} ${config.url}`) {
      case 'post /api/v1/token':
        data = {
          status: 200,
          userToken: {
            accessToken: 'test-token',
            refreshToken: 'refresh',
            exp: 123
          }
        };
        break;
      case 'get /api/v1/user':
        data = {
          status: 200,
          data: {
            id: 'u1',
            username: 'admin',
            roles: [],
            permissions: permissions.map(name => ({ name }))
          }
        };
        break;
      case 'get /api/v1/customers':
        data = { status: 200, data: customers };
        break;
      case 'post /api/v1/customer':
        customers = [...customers, { id: 2, ...body }];
        break;
      case 'put /api/v1/customer':
        customers = customers.map(item => (item.id === body.id ? body : item));
        break;
      case 'delete /api/v1/customer/1':
        if (failDelete)
          data = {
            status: -1,
            error: { code: 'FAILED', message: '客户正在入住，无法删除' }
          };
        else customers = [];
        break;
      case 'get /api/v1/rooms':
        data = { status: 200, data: rooms };
        break;
      case 'post /api/v1/room':
        rooms = [...rooms, { id: 'r2', status: 1, ...body }];
        break;
      case 'put /api/v1/room':
        rooms = rooms.map(item => (item.id === body.id ? body : item));
        break;
      case 'delete /api/v1/room/r1':
        rooms = [];
        break;
      case 'post /api/v1/customer-checkin-record':
        rooms = rooms.map(item => ({ ...item, status: 2 }));
        break;
      case 'get /api/v1/users':
        data = { status: 200, data: users };
        break;
      case 'post /api/v1/user':
        users = [...users, { id: 'u2', username: body.username }];
        break;
      case 'get /api/v1/stat/rooms/nums':
        data = {
          status: 200,
          data: { totalNums: 3, inUseNums: 1, notUsedNums: 2 }
        };
        break;
      case 'get /api/v1/stat/customers/counts':
        data = {
          status: 200,
          data: {
            pastWeekCustomerCounts: [
              { checkInDate: '2026-10-22', customerCount: 5 }
            ]
          }
        };
        break;
      default:
        throw new Error(`Unexpected request: ${config.method} ${config.url}`);
    }
    return { config, data, status: 200, statusText: 'OK', headers: {} };
  };
});
function renderProviders(ui: ReactNode) {
  return render(
    <ThemeProvider theme={theme}>
      <SWRConfig
        value={{
          provider: () => new Map(),
          dedupingInterval: 0,
          shouldRetryOnError: false
        }}
      >
        {ui}
      </SWRConfig>
    </ThemeProvider>
  );
}
function renderPage(node: ReactNode) {
  return renderProviders(node);
}
async function renderRoutes<TRouteTree extends AnyRoute>(
  routeTree: TRouteTree,
  initialPath: string
) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
    context: {}
  });
  await router.load();
  return renderProviders(<RouterProvider router={router} />);
}
const submitted = (url: string, method: string) =>
  calls.filter(call => call.url === url && call.method === method);

describe('MUI migration workflows', () => {
  it('validates login and stores the backend token before navigating', async () => {
    const user = userEvent.setup();
    const rootRoute = createRootRoute();
    await renderRoutes(
      rootRoute.addChildren([
        createRoute({
          getParentRoute: () => rootRoute,
          path: '/',
          component: () => <Login />
        }),
        createRoute({
          getParentRoute: () => rootRoute,
          path: '/dashboard',
          component: () => <div>已登录</div>
        })
      ]),
      '/'
    );
    await user.click(screen.getByRole('button', { name: '登录' }));
    expect(await screen.findByText('请输入用户名')).toBeVisible();
    expect(submitted('/api/v1/token', 'post')).toHaveLength(0);
    await user.type(screen.getByLabelText(/用户名/), 'admin');
    await user.type(screen.getByLabelText(/^密码/), 'secret');
    await user.click(screen.getByRole('button', { name: '显示密码' }));
    expect(screen.getByLabelText(/^密码/)).toHaveAttribute('type', 'text');
    await user.click(screen.getByRole('button', { name: '登录' }));
    expect(await screen.findByText('已登录')).toBeVisible();
    expect(readToken()?.accessToken).toBe('test-token');
    expect(submitted('/api/v1/token', 'post')[0].headers).toMatchObject({
      'Content-Type': 'application/json',
      username: 'admin',
      password: 'secret'
    });
    expect(submitted('/api/v1/token', 'post')[0].data).toBe('{}');
  });

  it('rejects mismatched registration passwords and registers after correction', async () => {
    const user = userEvent.setup();
    const rootRoute = createRootRoute();
    await renderRoutes(
      rootRoute.addChildren([
        createRoute({
          getParentRoute: () => rootRoute,
          path: '/',
          component: () => <Login register />
        }),
        createRoute({
          getParentRoute: () => rootRoute,
          path: '/login',
          component: () => <div>请登录</div>
        })
      ]),
      '/'
    );
    await user.type(screen.getByLabelText(/用户名/), 'newuser');
    await user.type(screen.getByLabelText(/^密码/), 'secret');
    await user.type(screen.getByLabelText(/确认密码/), 'different');
    await user.click(screen.getByRole('button', { name: '注册' }));
    expect(await screen.findByText('两次密码不一致')).toBeVisible();
    expect(submitted('/api/v1/user', 'post')).toHaveLength(0);
    await user.clear(screen.getByLabelText(/确认密码/));
    await user.type(screen.getByLabelText(/确认密码/), 'secret');
    await user.click(screen.getByRole('button', { name: '注册' }));
    expect(await screen.findByText('请登录')).toBeVisible();
  });

  it('creates and edits a customer and refreshes the cards', async () => {
    const user = userEvent.setup();
    renderPage(<Customer />);
    await screen.findByText('张三');
    await user.click(screen.getByRole('button', { name: '创建客户' }));
    await user.type(screen.getByLabelText(/客户名字/), '李四');
    await user.type(screen.getByLabelText(/手机号码/), '13900139000');
    await user.type(screen.getByLabelText(/身份证号码/), '654321');
    await user.click(screen.getByRole('button', { name: '确定' }));
    expect(await screen.findByText('李四')).toBeVisible();
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    await user.click(screen.getAllByRole('button', { name: '修改' })[0]);
    await user.clear(screen.getByLabelText(/客户名字/));
    await user.type(screen.getByLabelText(/客户名字/), '张三修改');
    await user.click(screen.getByRole('button', { name: '确定' }));
    expect(await screen.findByText('张三修改')).toBeVisible();
    expect(JSON.parse(submitted('/api/v1/customer', 'put')[0].data).id).toBe(1);
  });

  it('keeps a failed deletion open and allows retry, without deleting on cancel', async () => {
    const user = userEvent.setup();
    renderPage(<Customer />);
    await screen.findByText('张三');
    await user.click(screen.getByRole('button', { name: '删除' }));
    await user.click(screen.getByRole('button', { name: '取消' }));
    expect(submitted('/api/v1/customer/1', 'delete')).toHaveLength(0);
    await user.click(screen.getByRole('button', { name: '删除' }));
    failDelete = true;
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: '删除' })
    );
    expect(await screen.findByText('客户正在入住，无法删除')).toBeVisible();
    failDelete = false;
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: '删除' })
    );
    expect(await screen.findByText('暂无客户，请创建客户。')).toBeVisible();
  });

  it('validates room price and preserves a numeric price in the request', async () => {
    const user = userEvent.setup();
    renderPage(<Room />);
    await user.click(screen.getByRole('button', { name: '创建房间' }));
    await user.type(screen.getByLabelText(/房间名字/), '102');
    await user.clear(screen.getByLabelText(/房间价格/));
    await user.type(screen.getByLabelText(/房间价格/), '0');
    await user.click(screen.getByRole('button', { name: '确定' }));
    expect(await screen.findByText('价格至少为 1')).toBeVisible();
    await user.clear(screen.getByLabelText(/房间价格/));
    await user.type(screen.getByLabelText(/房间价格/), '300');
    await user.click(screen.getByRole('button', { name: '确定' }));
    expect(await screen.findByText('102')).toBeVisible();
    expect(JSON.parse(submitted('/api/v1/room', 'post')[0].data).price).toBe(
      300
    );
  });

  it('checks a customer in and refreshes occupancy', async () => {
    const user = userEvent.setup();
    renderPage(<Room />);
    await screen.findByText('101');
    await user.click(screen.getByRole('button', { name: '入住' }));
    await screen.findByLabelText(/入住时间/);
    await user.click(screen.getByRole('button', { name: '确定' }));
    expect(await screen.findByText('占用')).toBeVisible();
    expect(screen.getByRole('button', { name: '入住' })).toBeDisabled();
    const payload = JSON.parse(
      submitted('/api/v1/customer-checkin-record', 'post')[0].data
    );
    expect(payload).toMatchObject({ roomId: 'r1', customerId: 1 });
    expect(new Date(payload.endDate).getTime()).toBeGreaterThan(
      new Date(payload.beginDate).getTime()
    );
  });

  it('shows an empty customer state instead of an unusable check-in form', async () => {
    customers = [];
    renderPage(
      <AddCustomerRoomModal room={room} onClose={vi.fn()} onSuccess={vi.fn()} />
    );
    expect(
      await screen.findByText('请先在客户信息页面创建客户。')
    ).toBeVisible();
    expect(
      screen.queryByRole('button', { name: '确定' })
    ).not.toBeInTheDocument();
  });

  it('creates users and refreshes the table', async () => {
    const user = userEvent.setup();
    renderPage(<User />);
    await screen.findByText('admin');
    await user.click(screen.getByRole('button', { name: '创建用户' }));
    await user.type(screen.getByLabelText(/用户名/), 'newuser');
    await user.type(screen.getByLabelText(/^密码/), 'secret');
    await user.click(screen.getByRole('button', { name: '确定' }));
    expect(await screen.findByRole('cell', { name: 'newuser' })).toBeVisible();
  });

  it('redirects an unauthenticated direct visit without fetching protected data', async () => {
    localStorage.setItem('user_token', '{invalid');
    const rootRoute = createRootRoute();
    const layoutRoute = createRoute({
      getParentRoute: () => rootRoute,
      id: 'layout',
      component: Layout
    });
    await renderRoutes(
      rootRoute.addChildren([
        layoutRoute.addChildren([
          createRoute({
            getParentRoute: () => layoutRoute,
            path: '/room',
            component: Room
          })
        ]),
        createRoute({
          getParentRoute: () => rootRoute,
          path: '/login',
          component: () => <div>请登录</div>
        })
      ]),
      '/room'
    );
    expect(await screen.findByText('请登录')).toBeVisible();
    expect(calls).toHaveLength(0);
  });

  it('blocks unauthorized direct visits including trailing slashes and logs out without erasing unrelated storage', async () => {
    localStorage.setItem(
      'user_token',
      JSON.stringify({ accessToken: 'test-token' })
    );
    localStorage.setItem('preference', 'keep');
    const user = userEvent.setup();
    const rootRoute = createRootRoute();
    const layoutRoute = createRoute({
      getParentRoute: () => rootRoute,
      id: 'layout',
      component: Layout
    });
    await renderRoutes(
      rootRoute.addChildren([
        layoutRoute.addChildren([
          createRoute({
            getParentRoute: () => layoutRoute,
            path: '/customer',
            component: Customer
          })
        ]),
        createRoute({
          getParentRoute: () => rootRoute,
          path: '/login',
          component: () => <div>请登录</div>
        })
      ]),
      '/customer/'
    );
    expect(
      await screen.findByText('403 · 您没有访问此页面的权限')
    ).toBeVisible();
    expect(submitted('/api/v1/customers', 'get')).toHaveLength(0);
    expect(screen.getByRole('link', { name: '房间信息' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: '登出' }));
    expect(await screen.findByText('请登录')).toBeVisible();
    expect(readToken()).toBeNull();
    expect(localStorage.getItem('preference')).toBe('keep');
  });

  it('loads both dashboard statistics using the existing API paths', async () => {
    renderPage(<Dashboard />);
    await waitFor(() => expect(screen.getAllByTestId('chart')).toHaveLength(2));
    expect(screen.getAllByTestId('chart')[0]).toHaveTextContent('[1,2]');
    expect(screen.getAllByTestId('chart')[1]).toHaveTextContent('5');
  });
  it('edits and deletes rooms through the existing endpoints', async () => {
    const user = userEvent.setup();
    renderPage(<Room />);
    await screen.findByText('101');
    await user.click(screen.getByRole('button', { name: '修改' }));
    await user.clear(screen.getByLabelText(/房间名字/));
    await user.type(screen.getByLabelText(/房间名字/), '101A');
    await user.click(screen.getByRole('button', { name: '确定' }));
    expect(await screen.findByText('101A')).toBeVisible();
    expect(JSON.parse(submitted('/api/v1/room', 'put')[0].data)).toMatchObject({
      id: 'r1',
      status: 1
    });
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    await user.click(screen.getByRole('button', { name: '删除' }));
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: '删除' })
    );
    expect(await screen.findByText('暂无房间，请创建房间。')).toBeVisible();
  });

  it('rejects a checkout date before check-in', async () => {
    const user = userEvent.setup();
    renderPage(
      <AddCustomerRoomModal room={room} onClose={vi.fn()} onSuccess={vi.fn()} />
    );
    fireEvent.change(await screen.findByLabelText(/入住时间/), {
      target: { value: '2026-10-22' }
    });
    fireEvent.change(screen.getByLabelText(/离开时间/), {
      target: { value: '2026-10-21' }
    });
    await user.click(screen.getByRole('button', { name: '确定' }));
    expect(await screen.findByText('离开时间必须晚于入住时间')).toBeVisible();
    expect(submitted('/api/v1/customer-checkin-record', 'post')).toHaveLength(
      0
    );
  });

  it('recovers from a list request failure using the retry action', async () => {
    const adapter = client.defaults.adapter;
    client.defaults.adapter = async () => {
      throw new Error('offline');
    };
    const user = userEvent.setup();
    renderPage(<Customer />);
    expect(await screen.findByText('加载失败，请稍后重试')).toBeVisible();
    client.defaults.adapter = adapter;
    await user.click(screen.getByRole('button', { name: '重试' }));
    expect(await screen.findByText('张三')).toBeVisible();
  });

  it('keeps failed login on the form and allows another submission', async () => {
    const adapter = client.defaults.adapter;
    client.defaults.adapter = async config => ({
      config,
      status: 200,
      statusText: 'OK',
      headers: {},
      data: { status: -1, error: { code: 'AUTH', message: '用户名或密码错误' } }
    });
    const user = userEvent.setup();
    const rootRoute = createRootRoute();
    await renderRoutes(
      rootRoute.addChildren([
        createRoute({
          getParentRoute: () => rootRoute,
          path: '/',
          component: () => <Login />
        }),
        createRoute({
          getParentRoute: () => rootRoute,
          path: '/dashboard',
          component: () => <div>已登录</div>
        })
      ]),
      '/'
    );
    await user.type(screen.getByLabelText(/用户名/), 'admin');
    await user.type(screen.getByLabelText(/^密码/), 'secret');
    await user.click(screen.getByRole('button', { name: '登录' }));
    expect(await screen.findByText('用户名或密码错误')).toBeVisible();
    expect(readToken()).toBeNull();
    client.defaults.adapter = adapter;
    await user.click(screen.getByRole('button', { name: '登录' }));
    expect(await screen.findByText('已登录')).toBeVisible();
  });
});
