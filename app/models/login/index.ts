import { Instance, types, getParent } from 'mobx-state-tree';
import { AsyncTask, AsyncTaskStatus, runTask } from 'mst-async-task';
import * as Types from '../../services/api/api.types';
import { translate } from '../../i18n';
import { Auth } from '../auth';
import { withEnvironment } from '../extensions';

/**
 * Login Model
 */
export const LoginModel = types
  .model('Login')
  .props({
    loginUserTask: types.optional(AsyncTask, {}),
  })
  .extend(withEnvironment)
  .actions(self => {
    const login = (creds: Types.Login) =>
      runTask(self.loginUserTask, function* ({ exec }) {
        // No need to wrap in a try/catch block. Errors are handled by the task runner.
        const result = yield self.environment.baseApi.login(creds);
        // Wrap state updates in an exec() callback, which will prevent
        // execution if the task is aborted.
        exec(() => {
          if (result.kind === 'ok') {
            getParent<Auth>(self).saveToken({
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
            });
          } else {
            self.loginUserTask._resolve(AsyncTaskStatus.FAILED, {
              message: translate('errors.somethingWentWrong'),
              name: '',
            });
          }
        });
      });

    const logout = () => {
      self.loginUserTask.reset();
      getParent<Auth>(self).deleteToken();
    };

    return { login, logout };
  });

type LoginType = Instance<typeof LoginModel>;
export interface Login extends LoginType {}
