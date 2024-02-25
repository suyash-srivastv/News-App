import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { TextInput, Text } from 'react-native-paper';
import { themeContext } from '../themes';
import { theme } from '@storybook/react-native/dist/preview/components/Shared/theme';

type inputProp = {
  control: {};
  name: string;
  rules: {};
  placeholder: string;
  secureTextEntry: boolean | null;
};
const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}: inputProp) => {
  const theme = useContext(themeContext);
  return (
    <Controller
      mode={'outlined'}
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            mode="outlined"
            style={[
              styles.inputContainerStyle,
              {
                backgroundColor: theme.textInput,
              },
            ]}
            value={value}
            label={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            autoComplete={undefined}
            activeOutlineColor={theme.button}
            placeholderTextColor={'white'}
          />

          {error && (
            <Text style={styles.errorText}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    alignSelf: 'stretch',
  },
  input: {},
  inputContainerStyle: {
    margin: 8,
  },
});

export default CustomInput;
