/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your PrimaryNavigator) which the user
 * will use once logged in.
 */
import React, { useContext } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { AuthNavigator } from './auth-navigator';
import { SplashScreen } from '../screens';

import { HomeNavigator } from './home-navigator';

import { useStores } from '../models';
import { Theme } from '../config/theme';
import { Appearance } from 'react-native';
import { NavigationNight, NavigationTheme, themeContext } from '../themes';

export type RootParamList = {
  splashScreen: undefined;
  drawerNavigator: undefined;
  authStack: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();

const RootStack = () => {
  const theme = useContext(themeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackAnimation: 'fade',
      }}>
      <Stack.Screen name={'splashScreen'} component={SplashScreen} />
      <Stack.Screen name={'authStack'} component={AuthNavigator} />
      <Stack.Screen name={'drawerNavigator'} component={HomeNavigator} />
    </Stack.Navigator>
  );
};

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  const { startUpStore } = useStores();
  const colorScheme = Appearance.getColorScheme();
  return (
    <NavigationContainer
      {...props}
      ref={ref}
      theme={
        startUpStore.theme.length
          ? startUpStore.theme === 'dark'
            ? NavigationNight
            : NavigationTheme
          : colorScheme === 'dark'
          ? NavigationNight
          : NavigationTheme

        // startUpStore.theme === 'dark' ? CustomNightTheme : CustomDefaultTheme
      }>
      <RootStack />
    </NavigationContainer>
  );
});

RootNavigator.displayName = 'RootNavigator';
