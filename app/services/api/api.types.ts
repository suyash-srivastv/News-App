import { GeneralApiProblem } from './api-problem';

export interface ApiOkResponse {
  kind: 'ok';
}

export interface Login {
  email: string;
  password: string;
}
export interface News {
  query: string;
}

export interface Register {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthenticationResult extends ApiOkResponse {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export type GetAuthenticationResult = AuthenticationResult | GeneralApiProblem;
