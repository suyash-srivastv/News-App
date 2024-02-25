import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperNightTheme,
} from 'react-native-paper';

export const PaperTheme = {
  ...PaperDefaultTheme,
  colors: {
    // ...PaperDefaultTheme.colors,
    primary: 'blue',
    background: 'white',
    surface: 'white',
    // accent: string,
    // error: string,
    text: 'black',
    // onSurface: string,
    // disabled: string,
    placeholder: 'black',
    // backdrop: string,
    // notification: string;,
  },
};
export const NightPaperTheme = {
  ...PaperNightTheme,
  colors: {
    // ...PaperNightTheme.colors,
    text: 'white',
    primary: 'blue',
    background: 'black',
    // surface: string;
    // accent: string;
    // error: string;
    // text: string;
    // onSurface: string;
    // disabled: string;
    placeholder: 'white',
    // backdrop: string;
    // notification: string;
  },
};
