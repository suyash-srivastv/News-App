import { ParamListBase } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { AsyncTaskStatus } from 'mst-async-task';
import { isEmpty } from 'ramda';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import { TextInput, HelperText, Button, List, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { Alert } from '../../components/Alert';
import CustomInput from '../../components/CustomInputText';

import Screen from '../../components/Screen';
import { translate } from '../../i18n';
import { useStores } from '../../models';
import { NewsModel } from '../../models/news-result';
import { newsResult } from '../../services/api/news-result';
import { normalize } from '../../utils/normalize';
import { spacing } from '../../utils/spacing';
import { validate, ValidationErrors } from '../../utils/validation';
import auth from '@react-native-firebase/auth';
import { firebaseSignUp } from '../../firebase';
import RBSheet from 'react-native-raw-bottom-sheet';
import { themeContext } from '../../themes';

export interface SignupScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

export const SignupScreen: React.FunctionComponent<SignupScreenProps> =
  observer(props => {
    const {
      authStore: { registerStore },
    } = useStores();

    const {
      control,
      handleSubmit,
      formState: { isValid },
    } = useForm();

    const checkApi = async () => {
      console.log(await newsResult('dsf'));
      // console.log(await New('dsf'));
    };
    checkApi();
    const emailTextInput = useRef(null);
    const passwordTextInput = useRef(null);
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
      {},
    );
    const refRBSheet = useRef();
    // console.log(NewsModel.login('ed'));
    useEffect(() => {
      if (registerStore.registerUserTask.status === AsyncTaskStatus.COMPLETE) {
        navigateToHome();
      } else if (
        registerStore.registerUserTask.status === AsyncTaskStatus.FAILED
      ) {
        setValidationErrors({
          password: [registerStore.registerUserTask.error.message],
        });
      }
    }, [registerStore.registerUserTask.status]);

    const onSubmit = data => {
      console.log(data);
      if (isValid) {
        console.log('working');
      }
    };

    const onRegister = data => {
      console.log('working', data);

      firebaseSignUp(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        gender,
        data.age,
      );

      console.log(data.email, data.password);

      navigateToHome();
      if (isEmpty(true)) {
        registerStore.register({
          fullName: fullName,
          email: email,
          password: password,
        });
      }
    };

    const navigateToLogin = () => {
      props.navigation.replace('login');
    };

    const navigateToHome = () => {
      props.navigation.replace('drawerNavigator');
    };
    const theme = useContext(themeContext);

    const RenderLanguage = () => {
      return (
        <List.Section titleStyle={{ color: theme.text }}>
          <List.Item
            title="Male"
            onPress={() => {
              setGender('male');
              refRBSheet.current.close();
            }}
            titleStyle={{ color: theme.text }}
          />
          <List.Item
            title="Female"
            onPress={() => {
              setGender('female');
              refRBSheet.current.close();
            }}
            titleStyle={{ color: theme.text }}
          />
        </List.Section>
      );
    };
    return (
      <View style={[styles.screen, { backgroundColor: theme.background }]}>
        <CustomInput
          name="firstName"
          placeholder={translate('registerScreen.firstName')}
          control={control}
          rules={{
            required: 'Name is required',
            pattern: '/[0-9]/g',
            minLength: { value: 3, message: 'min length' },
          }}
          secureTextEntry={false}
        />
        <CustomInput
          name="lastName"
          placeholder={translate('registerScreen.lastName')}
          control={control}
          rules={{
            required: 'Name is required',
            pattern: '/[0-9]/g',
            minLength: { value: 3, message: 'min length' },
          }}
          secureTextEntry={false}
        />
        <CustomInput
          name="email"
          placeholder={translate('registerScreen.email')}
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
              message: 'Invalid email format',
            },
          }}
          secureTextEntry={false}
        />
        <CustomInput
          secureTextEntry
          name="password"
          placeholder={translate('registerScreen.password')}
          control={control}
          rules={{
            required: 'Password is required',
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message: 'Invalid password format',
            },
            minLength: { value: 8, message: 'min length' },
          }}
        />

        {gender ? (
          <Text
            style={[styles.genderText, { color: theme.color }]}
            onPress={() => refRBSheet.current.open()}>
            {gender}
          </Text>
        ) : (
          <Text
            style={[styles.genderText, { color: theme.color }]}
            onPress={() => refRBSheet.current.open()}>
            {translate('registerScreen.chooseGender')}
          </Text>
        )}

        <CustomInput
          name="age"
          placeholder={translate('registerScreen.age')}
          control={control}
          rules={{
            required: 'Age is required',
            pattern: '/[0-9]/g',
            min: { value: 18, message: 'Min age is 18' },
            max: { value: 100, message: 'Max age  is 100' },
            maxLength: { value: 3, message: 'Max length' },
          }}
          secureTextEntry={false}
        />

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
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
        <Button
          style={[styles.button, { backgroundColor: theme.button }]}
          color={theme.color}
          mode={'contained'}
          onPress={handleSubmit(onRegister)}>
          {translate('loginScreen.register')}
        </Button>
        <Button
          style={[styles.button, { borderColor: theme.button }]}
          mode={'text'}
          color={theme.button}
          onPress={navigateToLogin}>
          {translate('loginScreen.login')}
        </Button>
      </View>
    );
  });

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: normalize(spacing.extralarge),
  },
  errorText: {
    color: 'red',
    textAlign: 'right',
  },
  genderText: {
    textAlign: 'center',
    marginVertical: 13,
    fontSize: 20,
  },
});
