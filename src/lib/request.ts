import axios, { AxiosRequestConfig } from 'axios';
import { toastInstance } from '../components/Toast';
import { UserToken, UserTokenResponse } from '../types';
import { toast } from './toast';

/**
 * Create an Axios Client with defaults
 */
export const client = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((config) => {
  const tokenString = localStorage.getItem('user_token');
  if (tokenString) {
    try {
      const token = JSON.parse(tokenString) as UserToken;
      if (token.accessToken) {
        config!.headers!.Authorization = `Bearer ${token.accessToken}`;
      }
    } catch (e) {
      console.error(e);
    }
  }

  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(err);
    const { code, message } = err;
    const toastOption = {
      id: 'NETWORK_ERROR',
      title: '网络超时 - 刷新页面以恢复',
      status: 'error' as const,
      duration: 3000,
      isClosable: true,
    };
    if (
      (code === 'ECONNABORTED' || message === 'Network Error') && !toastInstance.isActive(toastOption.id)
    ) {
      toastInstance({ ...toastOption });
    }
    if (code === 'ERR_BAD_RESPONSE') {
      toastInstance({ ...toastOption, title: '服务器错误 - 请稍后再试' });
    }

    return Promise.reject(err);
  },
);

// eslint-disable-next-line consistent-return
export async function request<T = any>(options: AxiosRequestConfig): Promise<T> {
  try {
    const { data } = await client(options);
    if (data.status === -1) {
      toastInstance({
        title: '错误',
        description: data.error.message,
        position: 'top-right',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    return data as T;
  } catch (err) {
    if (err?.response?.status === 401) {
      localStorage.removeItem('user_token');
      window.location.href = '/login';
    } else if (err?.response?.status === 403) {
      localStorage.removeItem('user_token');
      window.location.href = '/login';
    } else if (err?.response?.status === 404) {
      localStorage.removeItem('user_token');
      window.location.href = '/login';
    }
    if (err.response) {
      console.error({
        status: err.response.status,
        data: err.response.data,
        Headers: err.response.headers,
      });
      throw err.response.data || '';
    } else {
      throw err;
    }
  }
}

export const login = async (username: string, password: string) => {
  try {
    const { data } = await client.request<UserTokenResponse>({
      url: '/api/v1/token',
      method: 'post',
      headers: {
        username,
        password,
      },
    });
    if (data.status === 200) {
      localStorage.setItem('user_token', JSON.stringify(data.userToken, null, 2));
    } else {
      toast.error('登录报错', data.error?.message || '登录报错');
    }
    return data;
  } catch (err) {
    if (err?.response?.status === 401) {
      window.location.href = '/401';
    } else if (err?.response?.status === 403) {
      window.location.href = '/403';
    } else if (err?.response?.status === 404) {
      window.location.href = '/404';
    }
    if (err.response) {
      console.error({
        status: err.response.status,
        data: err.response.data,
        Headers: err.response.headers,
      });
      throw err.response.data || '';
    } else {
      throw err;
    }
  }
};

export const logout = async () => {
  localStorage.removeItem('user_token');
};
