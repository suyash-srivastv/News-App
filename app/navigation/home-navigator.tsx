import React, { useContext } from 'react';
import { HomeScreen, LoginScreen, SignupScreen } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import setting from '../screens/home-screens/setting';
import profile from '../screens/home-screens/profile';
import news from '../screens/home-screens/news';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { theme } from '@storybook/react-native/dist/preview/components/Shared/theme';
import { themeContext } from '../themes';
export type AuthParamList = {
  home: undefined;
  setting: undefined;
  profile: undefined;
  news: undefined;
};

const Tab = createBottomTabNavigator<AuthParamList>();
// const theme = useContext(themeContext);
export const HomeNavigator = () => {
  const theme = useContext(themeContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: theme.active,
        tabBarInactiveTintColor: theme.inactive,
      }}>
      <Tab.Screen
        name={'home'}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={'news'}
        component={news}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="newspaper"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'profile'}
        component={profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={'setting'}
        component={setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
