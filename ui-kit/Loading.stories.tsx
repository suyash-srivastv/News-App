import React from "react";

import { storiesOf } from "@storybook/react-native";
import { withKnobs, select } from "@storybook/addon-knobs";
import { Story, StoryScreen, UseCase } from "../storybook/views";
import Loading from "./Loading";
import { StyleSheet, View } from "react-native";

declare var module;

storiesOf("Loading", module)
  .addDecorator(withKnobs)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("loading icon", () => (
    <Story>
      <UseCase text={"default"} usage={"used for loading indicators"}>
        <View style={styles.root}>
          <Loading />
        </View>
      </UseCase>
      <UseCase text={"large"} usage={"large loading indicator"}>
        <View style={styles.root}>
          <Loading
            size={select("size", { Large: "large", Small: "small" }, "large")}
          />
        </View>
      </UseCase>
      <UseCase text={"colors"} usage={"loading indicator colors"}>
        <View style={styles.root}>
          <Loading color={"red"} />
        </View>
      </UseCase>
    </Story>
  ))
  .add("Styling", () => (
    <Story>
      <UseCase text={"styling"} usage={"loading indicator styles"}>
        <Loading style={styles.marginStyle} />
      </UseCase>
    </Story>
  ));

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 10,
  },
  marginStyle: {
    margin: 10,
  },
});
