import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Button, List } from 'react-native-paper';
import { useStores } from '../../models';
import { themeContext } from '../../themes';
import firestore from '@react-native-firebase/firestore';
import { getProfile } from '../../firebase';
import { ChangeLanguage, translate } from '../../i18n';
const profile = ({ navigation }) => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [age, setAge] = useState<string>();

  useEffect(() => {
    populate();
  });

  const populate = async () => {
    const users = await getProfile();
    console.log(users._docs[0]._data);
    setFirstName(users._docs[0]._data.firstName);
    setLastName(users._docs[0]._data.lastName);
    setGender(users._docs[0]._data.gender);
    setAge(users._docs[0]._data.age);
  };
  const logout = () => {
    loginStore.logout();
    navigation.replace('authStack');
  };
  const {
    authStore: { loginStore },
  } = useStores();
  const theme = useContext(themeContext);
  const Leftlist = ({ name }) => {
    return <Text style={{ color: theme.text }}>{name}</Text>;
  };

  const renderProfileInfo = () => {
    return (
      <List.Section style={styles.list}>
        <List.Item
          left={() => <Leftlist name={translate('profile.firstName')} />}
          right={() => <Leftlist name={firstName} />}
          titleStyle={{ color: theme.text }}
        />
        <List.Item
          left={() => <Leftlist name={translate('profile.lastName')} />}
          right={() => <Leftlist name={lastName} />}
          titleStyle={{ color: theme.text }}
        />
        <List.Item
          left={() => <Leftlist name={translate('profile.gender')} />}
          right={() => <Leftlist name={gender} />}
          titleStyle={{ color: theme.text }}
        />
        <List.Item
          left={() => <Leftlist name={translate('profile.age')} />}
          right={() => <Leftlist name={age} />}
          titleStyle={{ color: theme.text }}
        />
      </List.Section>
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      {renderProfileInfo()}

      <Button
        color={theme.button}
        style={[styles.button, { borderColor: theme.button }]}
        mode="outlined"
        onPress={logout}>
        Logout
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 34,
  },
  button: {},
  list: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'baseline',
  },
});
export default profile;
