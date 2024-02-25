import * as React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#eee",
  },
  titleWrapper: {},
  title: {
    fontWeight: "600",
    color: "#3d3d3d",
  },
  useCaseWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderTopColor: "#e6e6e6",
    borderTopWidth: 1,
    flexDirection: "row",
  },
  useCase: {
    fontSize: 10,
    color: "#666",
    paddingHorizontal: 4,
    paddingBottom: 2,
  },
  usage: {
    color: "#666",
    fontSize: 10,
    paddingTop: 0,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
  },
  component: {
    backgroundColor: "#fff",
  },
});

export interface UseCaseProps {
  /** The title */
  text: string;
  /** when should we be using this */
  usage?: string;
  /** The component use case */
  children: React.ReactNode;
  /** A style override */
  style?: ViewStyle;
  /** Don't use padding because it's important to see the spacing */
  noPad?: boolean;
  /** Don't use the backgroundColor because it's important to see the backgroundColor */
  noBackground?: boolean;
}

export function UseCase(props: UseCaseProps) {
  const style: ViewStyle = {
    ...styles.component,
    ...{ paddding: props.noPad ? 0 : 10 },
    ...{
      backgroundColor: props.noBackground
        ? "rgba(0,0,0,0)"
        : styles.component.backgroundColor,
    },
    ...props.style,
  };
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.useCaseWrapper}>
          <Text style={styles.useCase}>Use Case</Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{props.text}</Text>
        </View>
        {props.usage ? <Text style={styles.usage}>{props.usage} </Text> : null}
      </View>
      <View style={style}>{props.children}</View>
    </View>
  );
}
