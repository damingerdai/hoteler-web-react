import { UserToken } from './userToken';

type SuccessResponse = { status: 200 };
type ErrorResponse = { status: -1, error: {
  code: string;
  message: string;
} };
export type CommonResponse = SuccessResponse | ErrorResponse;

export type DataResponse<T> = CommonResponse & { data: T };

export type ListResponse<T> = CommonResponse & { data: T[] };

export type UserTokenResponse = CommonResponse & { userToken: UserToken };
