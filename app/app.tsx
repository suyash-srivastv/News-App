import './i18n';
import React, { useState, useRef, useContext } from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

// import theme from './config/theme';
declare const global: { HermesInternal: null | {} };
import { Appearance } from 'react-native';
// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from 'react-native-screens';
import { RootStore, RootStoreProvider, setupRootStore } from './models';
import { RootNavigator } from './navigation/root-navigator';
import { NavigationContainerRef } from '@react-navigation/native';
import * as storage from './utils/storage';
import {
  setRootNavigation,
  useNavigationPersistence,
} from './navigation/navigation-utilities';

import { NetworkProvider } from './context-components/netinfo';
import { NightPaperTheme, PaperTheme } from './assets/color';
import { observer } from 'mobx-react-lite';

import I18n from 'i18n-js';
import { useMountEffect } from './hooks';

import { Theme, themeContext } from './themes';

enableScreens();

const exceptionhandler = (_error: Error, _isFatal: boolean) => {
  // your error handler function
};

setJSExceptionHandler(exceptionhandler, false);
// - exceptionhandler is the exception handler function
// - allowInDevMode is an optional parameter is a boolean.

setNativeExceptionHandler(_exceptionString => {
  // This is your custom global error handler
  // You do stuff like hit google analytics to track crashes.
  // or hit a custom api to inform the dev team.
  //NOTE: alert or showing any UI change via JS
  //WILL NOT WORK in case of NATIVE ERRORS.
});

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

// const colorScheme = Appearance.getColorScheme();
// if (colorScheme === 'dark') {
//   // Use dark color scheme
// }
function App() {
  // const theme = useContext(themeContext);
  const navigationRef = useRef<NavigationContainerRef>();
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);

  setRootNavigation(navigationRef);
  const { initialNavigationState, onNavigationStateChange } =
    useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const initializeStore = () => {
    setupRootStore().then(root => {
      setRootStore(root);
      console.log(root);
      I18n.locale = root.startUpStore.chosenLanguage;
      console.log(I18n.currentLocale);
    });
  };
  useMountEffect(initializeStore);

  if (!rootStore) {
    return null;
  }
  const colorScheme = Appearance.getColorScheme();
  console.log(colorScheme);
  return (
    <themeContext.Provider
      value={
        rootStore.startUpStore.theme
          ? rootStore.startUpStore.theme === 'dark'
            ? Theme.dark
            : Theme.light
          : colorScheme === 'dark'
          ? Theme.dark
          : Theme.light
      }>
      <RootStoreProvider value={rootStore}>
        <PaperProvider
          theme={
            rootStore.startUpStore.theme.length
              ? rootStore.startUpStore.theme === 'dark'
                ? NightPaperTheme
                : PaperTheme
              : colorScheme === 'dark'
              ? NightPaperTheme
              : PaperTheme
            // ? theme
          }>
          <StatusBar
            barStyle={
              rootStore.startUpStore.theme === 'dark'
                ? 'light-content'
                : 'light-content'
            }
          />
          <NetworkProvider showSnackBarWhenDisconnected>
            <RootNavigator
              ref={navigationRef}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </NetworkProvider>
        </PaperProvider>
      </RootStoreProvider>
    </themeContext.Provider>
  );
}

export default observer(App);
