import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationNightTheme,
} from '@react-navigation/native';

export const NavigationNight = {
  ...NavigationNightTheme,

  color: {
    ...NavigationNightTheme.colors,
    primary: '#6200EE',
    background: 'black',
    // card: string;
    text: 'white',
    // border: string;
    // notification: string;
  },
};
export const NavigationTheme = {
  ...NavigationDefaultTheme,
  colors: {
    // ...NavigationDefaultTheme.colors,
    primary: '#3700B3',
    background: '#6200EE',
    // card: string;
    text: 'white',
    // border: string;
    // notification: string;
  },
};
