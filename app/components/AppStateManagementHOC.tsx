import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import ErrorScreen from './ErrorScreen';
import LoaderScreen from './LoaderScreen';

interface AppStateManagementHOCProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  errorTitle?: string;
  errorDescription?: string;
  errorImage?: string;
  showError: boolean;
  loading: boolean;
  dismiss: () => void;
}

const AppStateManagementHOC = (Component) => ({
  children,
  style,
  loading = false,
  errorTitle,
  errorDescription,
  errorImage,
  showError = false,
  dismiss,
}: ErrorAndLoadingHOCProps) => {
  return (
    <View style={[style, { flex: 1 }]}>
      <Component>{children}</Component>
      {showError && (
        <ErrorScreen
          errorTitle={errorTitle}
          dismiss={dismiss}
          errorTitle={errorTitle}
          errorDescription={errorDescription}
          errorImage={errorImage}
        />
      )}
      {loading && <LoaderScreen />}
    </View>
  );
};

export default AppStateManagementHOC;
