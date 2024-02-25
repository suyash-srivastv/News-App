import React from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { ViewStyle } from "react-native";

export interface LoadingProps {
  size?: "small" | "large";
  color?: string;
  style?: ViewStyle;
}

const Loading = ({ size = "small", color, style = {} }: LoadingProps) => {
  const { colors } = useTheme();
  if (!color) {
    color = colors.primary;
  }
  return (
    <ActivityIndicator
      animating={true}
      size={size}
      color={color}
      style={style}
    />
  );
};

export default Loading;
