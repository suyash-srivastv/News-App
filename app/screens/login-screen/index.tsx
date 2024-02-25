import { ParamListBase } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { AsyncTaskStatus } from 'mst-async-task';
import { isEmpty } from 'ramda';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import CustomInput from '../../components/CustomInputText';
import auth from '@react-native-firebase/auth';

import Screen from '../../components/Screen';
import { translate } from '../../i18n';
import { useStores } from '../../models';
import { normalize } from '../../utils/normalize';
import { spacing } from '../../utils/spacing';
import {
  validate,
  ValidationErrors,
  ValidationRules,
} from '../../utils/validation';
import { themeContext } from '../../themes';

export interface LoginScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const constraints: ValidationRules = {
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters',
    },
  },
};

export const LoginScreen: React.FunctionComponent<LoginScreenProps> = observer(
  props => {
    const {
      authStore: { loginStore },
    } = useStores();

    const {
      control,
      handleSubmit,
      formState: { isValid },
    } = useForm();
    const theme = useContext(themeContext);
    const passwordTextInput = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
      {},
    );

    useEffect(() => {
      if (loginStore.loginUserTask.status === AsyncTaskStatus.COMPLETE) {
        navigateToHome();
      } else if (loginStore.loginUserTask.status === AsyncTaskStatus.FAILED) {
        setValidationErrors({
          password: [loginStore.loginUserTask.error.message],
        });
      }
    }, [loginStore.loginUserTask.status]);

    const onSubmit = data => {
      console.log(data);
      if (isValid) {
        console.log('working');
      }
    };
    const firebaseLogin = (email: string, password: string) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Login Success');
          loginStore.login({ email: email, password: password });
          navigateToHome();
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    };
    const onLogin = data => {
      console.log(data.email, data.password);
      // const result = validate(constraints, {
      //   email: email,
      //   password: password,
      // });
      // setValidationErrors(result);
      firebaseLogin(data.email, data.password);
    };

    const navigateToRegister = () => {
      props.navigation.replace('signup');
    };

    const navigateToHome = () => {
      props.navigation.replace('drawerNavigator');
    };

    return (
      <View style={[styles.screen, { backgroundColor: theme.background }]}>
        <CustomInput
          name="email"
          placeholder={translate('registerScreen.email')}
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
              message: 'invalid email',
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
        <Button
          style={[styles.button, { backgroundColor: theme.button }]}
          mode={'contained'}
          color={theme.color}
          onPress={handleSubmit(onLogin)}>
          {translate('loginScreen.login')}
        </Button>
        <Button
          style={[styles.button, { borderColor: 'theme.button' }]}
          mode={'text'}
          color={theme.button}
          onPress={navigateToRegister}>
          {translate('loginScreen.register')}
        </Button>
      </View>
    );
  },
);

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
  alertCancelbutton: {
    borderWidth: normalize(1),
    borderColor: 'red',
  },
  alertTitle: {
    color: 'red',
  },
  button: {},
});
