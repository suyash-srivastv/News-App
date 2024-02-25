import { View, StyleSheet } from 'react-native';
import React, { useContext, useRef } from 'react';
import { Button, List, Switch, Text, useTheme } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Store } from '../../models/startup';
import { observer } from 'mobx-react-lite';
import I18n from 'i18n-js';
import RNRestart from 'react-native-restart';
import { ChangeLanguage, translate } from '../../i18n';
import { useStores } from '../../models';

import { Appearance } from 'react-native';
import { themeContext } from '../../themes';
const Setting = () => {
  const theme = useContext(themeContext);
  const { startUpStore } = useStores();

  const [isSwitchOn, setIsSwitchOn] = React.useState(
    startUpStore.theme === 'dark' ? true : false,
  );
  // startUpStore.theme === 'dark' ? true : false,

  console.log(startUpStore.theme, startUpStore.chosenLanguage);
  const refRBSheet = useRef();
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (isSwitchOn) {
      startUpStore.addTheme('light');
    } else {
      startUpStore.addTheme('dark');
    }
  };
  const RenderLanguage = () => {
    return (
      <List.Section titleStyle={{ color: theme.text }}>
        <List.Item
          title="English"
          onPress={() => onChangeLanguage('en')}
          titleStyle={{ color: theme.text }}
        />
        <List.Item
          title="Japan"
          onPress={() => onChangeLanguage('ja')}
          titleStyle={{ color: theme.text }}
        />
      </List.Section>
    );
  };
  const renderLanguages = () => {
    return (
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: { backgroundColor: theme.background },
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: theme.text,
          },
        }}>
        <RenderLanguage />
      </RBSheet>
    );
  };
  const renderList = () => {
    return (
      <List.Section>
        <List.Item
          titleStyle={{ color: theme.text }}
          title={translate('settingScreen.theme')}
          right={() => (
            <Switch
              color={theme.active}
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
            />
          )}
        />
        <List.Item
          title={translate('settingScreen.chooseLanguage')}
          onPress={() => refRBSheet.current.open()}
          titleStyle={{ color: theme.text }}
        />
      </List.Section>
    );
  };
  const onChangeLanguage = (lang: string) => {
    ChangeLanguage(lang);
    startUpStore.addLanguage(lang);
    RNRestart.Restart();
    console.log(I18n.currentLocale());
    refRBSheet.current.close();
  };
  const { colors } = useTheme();
  console.log('usetheme colors', colors.primary);
  return (
    <View style={[styles.cont, { backgroundColor: theme.background }]}>
      {renderList()}
      {renderLanguages()}
    </View>
  );
};
// const styles = StyleSheet.create({});
const styles = StyleSheet.create({
  switchView: { flexDirection: 'row', justifyContent: 'space-between' },
  cont: { flex: 1, justifyContent: 'center', paddingHorizontal: 22 },
});
export default observer(Setting);
