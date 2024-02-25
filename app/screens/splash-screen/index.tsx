import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../models';

export interface SplashScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

export const SplashScreen: React.FunctionComponent<SplashScreenProps> =
  observer(({ navigation }) => {
    const { authStore } = useStores();

    // Handle loading of required data before navigating to home or login
    useEffect(() => {
      if (authStore.isAuthenticated) {
        navigation.replace('drawerNavigator');
      } else {
        navigation.replace('authStack');
      }
    });
    return (
      <View style={styles.container}>
        <Text>Splash Screen</Text>
      </View>
    );
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
