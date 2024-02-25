import React from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Platform,
  ViewStyle,
  StyleProp
} from "react-native";
import {
  useTheme
} from 'react-native-paper';
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from "react-native-safe-area-context";

interface ScreenProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /**
   * Should we not wrap in SafeAreaView? Defaults to false.
   */
  unsafe?: boolean;
}

const Screen = ({ children, style, unsafe = false }: ScreenProps) => {

  const Wrapper = unsafe ? View : SafeAreaView;
  const { colors } = useTheme();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Wrapper style={[style, { backgroundColor: colors.background }]}>
          {children}
        </Wrapper>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Screen;
