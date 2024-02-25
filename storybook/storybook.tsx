import { getStorybookUI, configure } from '@storybook/react-native';
import { loadStories } from './storyLoader.js';

// load react-native addons for storybook rn
import '@storybook/addon-ondevice-knobs/register';

declare var module;

configure(() => {
  loadStories();
}, module);

export const StorybookUIRoot = getStorybookUI({
  port: 9001,
  host: 'localhost',
  onDeviceUI: true,
  asyncStorage:
    require('@react-native-community/async-storage').default || null,
});
