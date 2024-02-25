import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentOptions,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { version as appVersion } from '../../../package.json';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const DrawerContent: React.FunctionComponent<
  DrawerContentComponentProps<DrawerContentOptions>
> = (props) => {
  return (
    <>
      <DrawerContentScrollView
        contentContainerStyle={styles.contentContainerStyle}
        {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text style={styles.appVersion}> {`App version ${appVersion}`} </Text>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 0.9,
  },
  appVersion: {
    flex: 0.1,
    alignSelf: 'center',
  },
});