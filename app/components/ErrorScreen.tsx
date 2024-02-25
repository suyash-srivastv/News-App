import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { translate } from '../i18n';
import { normalize } from '../utils/normalize';

interface ErrorScreenProps {
  errorTitle?: string;
  errorDescription?: string;
  errorImage?: string;
  buttonText?: string;
  dismiss: () => void;
}

const ErrorScreen = ({
  errorTitle = translate('errorScreen.title'),
  errorDescription = translate('errorScreen.description'),
  errorImage = 'https://reactnative.dev/img/tiny_logo.png',
  buttonText = translate('errorScreen.button'),
  dismiss,
}: ErrorScreenProps) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <Image
        style={{ height: normalize(100), width: normalize(100) }}
        source={{
          uri: errorImage,
        }}
      />
      <Text style={styles.titleText}>{errorTitle} </Text>
      <Text style={styles.descriptionText}>{errorDescription}</Text>
      <Button mode={'text'} onPress={dismiss}>
        {buttonText}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  titleText: {
    fontSize: 20,
  },
  descriptionText: {
    padding: 20,
    fontSize: 14,
  },
});

export default ErrorScreen;
