import { login } from './login';
import { newsResult } from './news-result';
import { register } from './register';

const baseApi = {
  login,
  register,
  newsResult,
};

export type BaseApi = typeof baseApi;
export { baseApi };
