import React from 'react';
import {View, StyleSheet} from 'react-native';

import colors from '../config/colors';

const Card = ({style, children}) => {
  return <View style={{...styles.card, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default Card;
