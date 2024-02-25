import { Instance, types } from 'mobx-state-tree';
/**
 * NetworkStatus Model
 */
export const NetworkStatusModel = types
  .model('NetworkStatus')
  .props({
    isNetworkAvailable: false,
  })
  .actions(self => ({
    setNetworkStatus: function (status: boolean) {
      self.isNetworkAvailable = status;
    },
  }));

type NetworkStatusType = Instance<typeof NetworkStatusModel>;
export interface NetworkStatus extends NetworkStatusType {}
