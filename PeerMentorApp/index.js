import { registerRootComponent } from 'expo';
var React = require('react-native');

import App from './src/App';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
console.disableYellowBox = true;

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
