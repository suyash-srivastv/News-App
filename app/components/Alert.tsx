import React from "react";
import { View, ViewStyle } from "react-native";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";

interface AlertButton {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  color?: string;
}

interface AlertProps {
  title: string;
  description: string;
  visible: boolean;
  buttonsList?: AlertButton[];
  titleStyle?: ViewStyle;
  descriptionStyle?: ViewStyle;
  dismissable?: boolean;
  onDismiss: () => Void;
}

export const Alert = ({
  title,
  description,
  visible,
  buttonsList,
  titleStyle,
  descriptionStyle,
  onDismiss,
  dismissable = false,
}: Props) => {
  const customButtons = () => {
    return buttonsList.map((buttons) => (
      <Button
        key={buttons.text}
        color={buttons.color}
        style={buttons.style}
        onPress={buttons.onPress}
      >
        {buttons.text}
      </Button>
    ));
  };

  const defaultButton = () => {
    return <Button onPress={onDismiss}>OK!</Button>;
  };

  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          dismissable={dismissable}
          onDismiss={onDismiss}
        >
          <Dialog.Title style={titleStyle}>{title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={descriptionStyle}>{description}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            {buttonsList ? customButtons() : defaultButton()}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
