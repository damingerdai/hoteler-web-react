import { UserToken } from './userToken';

export interface CommonResponse {
  status: number,
  error?: {
    code: string;
    message: string;
  }
}

export type DataResponse<T> = CommonResponse & { data: T };

export type UserTokenResponse = CommonResponse & { userToken: UserToken };
