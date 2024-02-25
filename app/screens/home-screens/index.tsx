import React, { useContext } from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  Text as NativeText,
  View,
} from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { useTheme, Text, Button } from 'react-native-paper';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { observer } from 'mobx-react-lite';
import Screen from '../../components/Screen';
import { useStores } from '../../models';
import Caraousal from '../../components/Caraousal';
import NewsResult from '../../components/NewsResults';
import { themeContext } from '../../themes';

export interface HomeScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  name: string;
}

const headerImageHeight = Dimensions.get('window').height * 0.25;

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = observer(
  props => {
    const {
      authStore: { loginStore },
    } = useStores();
    const theme = useContext(themeContext);
    const { colors } = useTheme();
    // roo;
    return (
      <View style={[styles.screen, { backgroundColor: theme.background }]}>
        <Caraousal />
        <NewsResult />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  welcomeText: {
    position: 'absolute',
    top: headerImageHeight - 60,
    color: 'white',
    fontSize: 20,
    padding: 20,
    fontWeight: 'bold',
  },
  headerImage: {
    height: headerImageHeight,
    resizeMode: 'cover',
  },
  girlImage: {
    top: 30,
    height: '30%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  introductionText: {
    top: 30,
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    alignSelf: 'center',
  },
  button: {
    top: 60,
    borderRadius: 40,
    marginHorizontal: 30,
  },
});
