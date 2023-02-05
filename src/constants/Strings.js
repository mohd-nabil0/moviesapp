import {Platform, StatusBar} from 'react-native';

export const LANGUAGES = [
  {code: 'en', label: 'English'},
  {code: 'ar', label: 'Arabic'},
];

export const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 50 : 56;
