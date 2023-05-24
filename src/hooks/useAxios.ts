import { AxiosRequestConfig } from 'axios';
import useAxioslib, { Options } from 'axios-hooks';
import { client } from '../lib/request';

useAxioslib.configure({ axios: client });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const redirect = (url: string) => {
  window.location.replace(url);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const retry = () => {
  window.location.reload();
};

export function useAxios<TResponse = any, TBody = any, TError = any>(
  config: AxiosRequestConfig<TBody> | string,
  options?: Options,
) {
  let requestConfig = config as AxiosRequestConfig<TBody>;
  if (typeof config === 'string') {
    requestConfig = {
      url: config,
      timeout: 10_000,
    } as AxiosRequestConfig<TBody>;
  }
  const headers = requestConfig.headers || {};
  delete requestConfig.headers;

  const response = useAxioslib<TResponse, TBody, TError>(
    {
      headers: {
        authorization: '', // TODO  add authorization token
        ...headers,
      },
      ...requestConfig,
    },
    options,
  );

  return response;
}
