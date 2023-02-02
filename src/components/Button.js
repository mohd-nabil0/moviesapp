import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import colors from '../config/colors';

function AppButton({title, onPress, disable = true, color = 'primary'}) {
  return (
    <TouchableOpacity
      style={styles.button(disable)}
      onPress={onPress}
      disabled={disable}>
      <Text style={styles.text(disable)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: disable => ({
    backgroundColor: colors[disable ? 'disable' : 'primary'],
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    width: '100%',
    marginVertical: 10,
  }),
  text: disable => ({
    color: colors[disable ? 'medium' : 'white'],
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  }),
});

export default AppButton;
