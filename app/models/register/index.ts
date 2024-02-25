import { Instance, types, getParent } from 'mobx-state-tree';
import { AsyncTask, AsyncTaskStatus, runTask } from 'mst-async-task';
import { translate } from '../../i18n';
import * as Types from '../../services/api/api.types';
import { Auth } from '../auth';
import { withEnvironment } from '../extensions';

export const RegisterModel = types
  .model('Register')
  .props({
    registerUserTask: types.optional(AsyncTask, {}),
  })
  .extend(withEnvironment)
  .actions(self => {
    const register = (userDetails: Types.Register) =>
      runTask(self.registerUserTask, function* ({ exec }) {
        // No need to wrap in a try/catch block. Errors are handled by the task runner.
        let result = yield self.environment.baseApi.register(userDetails);
        // Wrap state updates in an exec() callback, which will prevent
        // execution if the task is aborted.
        exec(() => {
          if (result.kind === 'ok') {
            getParent<Auth>(self).saveToken({
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
            });
          } else {
            self.registerUserTask._resolve(AsyncTaskStatus.FAILED, {
              message: translate('errors.somethingWentWrong'),
              name: '',
            });
          }
        });
      });

    return { register };
  });

type RegisterType = Instance<typeof RegisterModel>;
export interface Register extends RegisterType {}
