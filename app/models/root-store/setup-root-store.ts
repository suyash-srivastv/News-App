import { onSnapshot } from 'mobx-state-tree';
import { RootStoreModel, RootStore } from './root-store';
import environment from '../environment';
import * as storage from '../../utils/storage';

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = 'root';

type StrToBoolMap = { [key: string]: boolean };
type StrToAnyMap = { [key: string]: any };

/**
 * Convert mst store keys array to dictionary of bool
 * @param arr Array of keys in mst store
 */
function arrToDict(arr?: Array<string>): StrToBoolMap {
  if (!arr) {
    return {};
  }
  return arr.reduce((dict: StrToBoolMap, elem) => {
    dict[elem] = true;
    return dict;
  }, {});
}

/**
 * list of mox stores to save in async storage
 */
const whitelist = ['authStore', 'startUpStore'];
const whitelistDict = arrToDict(whitelist);

export async function setupRootStore() {
  let rootStore: RootStore;
  let data: any;
  try {
    // load data from storage
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {};
    rootStore = RootStoreModel.create(data, environment);
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, environment);
  }

  onSnapshot(rootStore, (snapshot: StrToAnyMap) => {
    Object.keys(snapshot).forEach(key => {
      if (!whitelistDict[key]) {
        delete snapshot[key];
      }
    });
    storage.save(ROOT_STATE_STORAGE_KEY, snapshot);
  });

  return rootStore;
}
