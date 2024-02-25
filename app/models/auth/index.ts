import { Instance, types } from 'mobx-state-tree';
import { LoginModel } from '../login';
import { RegisterModel } from '../register';

export const AuthModel = types
  .model('Auth')
  .props({
    accessToken: types.optional(types.string, ''),
    refreshToken: types.optional(types.string, ''),
    loginStore: types.optional(
      types.late(() => LoginModel),
      {}
    ),
    registerStore: types.optional(
      types.late(() => RegisterModel),
      {}
    ),
  })
  .views((self) => ({
    get isAuthenticated() {
      return !!self.accessToken;
    },
  }))
  .actions((self) => ({
    saveToken({
      accessToken,
      refreshToken,
    }: {
      accessToken: string;
      refreshToken: string;
    }) {
      self.accessToken = accessToken;
      self.refreshToken = refreshToken;
    },
    deleteToken() {
      self.accessToken = '';
      self.refreshToken = '';
    },
  }));

type AuthType = Instance<typeof AuthModel>;
export interface Auth extends AuthType {}
