import { UserToken } from './userToken';

export interface CommonResponse {
  status: number,
  error?: {
    code: string;
    message: string;
  }
}

export type UserTokenResponse = CommonResponse & { userToken: UserToken };
