import React, { useState } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';

interface LoaderScreenProps {
  hide: boolean;
}

const LoaderScreen = ({ hide = false }: LoaderScreenProps) => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      {!hide && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', elevation: 3 },
});

export default LoaderScreen;
