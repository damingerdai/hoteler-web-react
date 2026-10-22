import axios, { type AxiosRequestConfig } from 'axios';
import type { CommonResponse, UserToken, UserTokenResponse } from '../types';
import { toast } from './toast';

export function readToken(): UserToken | null {
  try {
    const token = JSON.parse(localStorage.getItem('user_token') || 'null');
    return typeof token?.accessToken === 'string' && token.accessToken
      ? token
      : null;
  } catch {
    return null;
  }
}
export const client = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});
client.interceptors.request.use(config => {
  const token = readToken();
  if (token) config.headers.Authorization = `Bearer ${token.accessToken}`;
  return config;
});
export function errorMessage(error: unknown): string {
  if (axios.isAxiosError(error))
    return (
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      '网络请求失败，请稍后重试'
    );
  return error instanceof Error ? error.message : '操作失败，请稍后重试';
}
export async function request<T extends CommonResponse = CommonResponse>(
  options: AxiosRequestConfig
): Promise<T> {
  try {
    const { data } = await client.request<T>(options);
    if (data.status === -1) {
      if (data.error.code === 'ERR-600010') {
        localStorage.removeItem('user_token');
        window.location.assign('/login');
      }
      throw new Error(data.error.message);
    }
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('user_token');
      window.location.assign('/login');
    }
    toast.error(errorMessage(error));
    throw error;
  }
}
export async function login(username: string, password: string) {
  try {
    const { data } = await client.request<UserTokenResponse>({
      url: '/api/v1/token',
      method: 'post',
      headers: { username, password }
    });
    if (data.status === -1) throw new Error(data.error.message);
    if (!data.userToken?.accessToken)
      throw new Error('登录失败，请检查用户名和密码');
    localStorage.setItem('user_token', JSON.stringify(data.userToken));
    return data;
  } catch (error) {
    toast.error(errorMessage(error));
    throw error;
  }
}
export function logout() {
  localStorage.removeItem('user_token');
}
