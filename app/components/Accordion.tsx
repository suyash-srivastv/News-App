import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { normalize } from '../utils/normalize';
import { IconButton } from 'react-native-paper';

type AccordionElement = () => React.ReactElement;

interface AccordionProps {
  containerStyle?: StyleProp<ViewStyle>;
  bodyHeight?: number;
  headerHeight: number;
  renderHeader: AccordionElement;
  renderBody: AccordionElement;
}

export const Accordion: React.FunctionComponent<AccordionProps> = (props) => {
  const height = useSharedValue(normalize(props.headerHeight));
  const arrowAngle = useSharedValue(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(props.bodyHeight ?? 0);

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const arrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${arrowAngle.value}deg` }],
    };
  });

  const toggle = () => {
    setIsExpanded(!isExpanded);
    height.value = withTiming(
      isExpanded ? props.headerHeight : props.headerHeight + bodyHeight
    );
    arrowAngle.value = withTiming(isExpanded ? 0 : -180);
  };

  const header = () => {
    return <View style={styles.header}>{props.renderHeader()}</View>;
  };

  const headerView = () => {
    return (
      <TouchableWithoutFeedback onPress={toggle}>
        <View style={[styles.headerView, { height: props.headerHeight }]}>
          {header()}
          <TouchableOpacity onPress={toggle}>
            <Animated.View style={[styles.chevron, arrowAnimatedStyle]}>
              <IconButton icon="chevron-down" size={20} />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const bodyHeightSettingView = () => {
    return (
      <View
        style={styles.bodyHeightSettingView}
        pointerEvents="none"
        onLayout={(event) => {
          setBodyHeight(event.nativeEvent.layout.height);
        }}>
        {props.renderBody()}
      </View>
    );
  };

  return (
    <View>
      {/* bodyHeightSettingView renders a dummy view to calculate the height of the variable children in case we do not specify the prop titleContentHeight and helps achieve dynamic height  */}
      {!props.bodyHeight && bodyHeightSettingView()}
      <Animated.View
        style={[styles.container, props.containerStyle, heightAnimatedStyle]}>
        {headerView()}
        {props.renderBody()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    paddingHorizontal: normalize(16),
    marginVertical: normalize(16),
  },
  header: {
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bodyHeightSettingView: {
    flex: 1,
    position: 'absolute',
    opacity: 0,
  },
  chevron: {
    width: normalize(44),
    height: normalize(44),
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
