import React from 'react';
import { HomeScreen } from '../../screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ContactUsScreen } from '../../screens/contact-us-screen';
import { DrawerContent } from './drawer-content';

export interface DrawerNavigatorProps {}

export type DrawerParamList = {
  home: undefined;
  contactUs: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DrawerNavigator: React.FunctionComponent<DrawerNavigatorProps> = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name='home'
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name='contactUs'
        component={ContactUsScreen}
        options={{
          title: 'Contact Us',
        }}
      />
    </Drawer.Navigator>
  );
};
