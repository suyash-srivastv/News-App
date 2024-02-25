import { Dimensions, Platform, PixelRatio } from "react-native";
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
  "window"
);

// The dimensions taken from IPhone 11
const wscale: number = SCREEN_WIDTH / 414;
const hscale: number = SCREEN_HEIGHT / 896;

// Note:
// If you are developing for tablet
// please go through the react-native-size-matters package.
//(https://github.com/nirsky/react-native-size-matters)
export function normalize(size: number, based: "width" | "height" = "height") {
  const newSize = based === "height" ? size * hscale : size * wscale;
  return Platform.OS === "ios"
    ? Math.round(PixelRatio.roundToNearestPixel(newSize))
    : Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
