import {Platform} from 'react-native';

import colors from './colors';

export default {
  colors,
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  text: {
    width: '100%',
    color: colors.dark,
    fontSize: 15,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
};
