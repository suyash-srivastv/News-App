import { useTheme } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { LoginScreen, SignupScreen } from '../screens';

export type AuthParamList = {
  login: undefined;
  signup: undefined;
};

const Stack = createNativeStackNavigator<AuthParamList>();

export const AuthNavigator = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        options={{
          title: 'Login',
          headerStyle: { backgroundColor: colors.background },
        }}
        name={'login'}
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          title: 'Register',
          headerStyle: { backgroundColor: colors.background },
        }}
        name={'signup'}
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
};
