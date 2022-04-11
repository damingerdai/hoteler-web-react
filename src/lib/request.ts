import { createStandaloneToast } from '@chakra-ui/react';
import axios, { AxiosRequestConfig } from 'axios';

/**
 * Create an Axios Client with defaults
 */

// eslint-disable-next-line import/prefer-default-export
const client = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// eslint-disable-next-line consistent-return
export const request = async (options: AxiosRequestConfig) => {
  try {
    const { data } = await client(options);
    if (data.status === -1) {
      const toast = createStandaloneToast();
      toast({
        title: '错误',
        description: data.error.message,
        position: 'top-right',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
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
      console.error(err);
    }
  }
};
