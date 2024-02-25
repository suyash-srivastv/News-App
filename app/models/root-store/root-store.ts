import { Instance, types } from 'mobx-state-tree';
import { AuthModel } from '../auth';
import { NetworkStatusModel } from '../network-status';
import { StartUpModel } from '../startup';
/**
 * A RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  authStore: types.optional(AuthModel, {}),
  networkStore: types.optional(NetworkStatusModel, {}),
  startUpStore: types.optional(StartUpModel, {}),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
