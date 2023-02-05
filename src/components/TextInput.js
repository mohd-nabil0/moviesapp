import React from 'react';
import {View, TextInput, StyleSheet, Platform} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import defaultStyles from '../theme/styles';
import {useTranslation} from 'react-i18next';
import {LANGUAGES} from '../constants/Strings';

function AppTextInput({icon, width = '100%', placeholder, ...otherProps}) {
  const {t, i18n} = useTranslation();

  return (
    <View style={[styles.container, {width}]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.primary}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={{...defaultStyles.text, ...styles.text(i18n.language)}}
        placeholder={t(placeholder)}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginTop: 16,
    marginBottom: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: defaultStyles.colors.secondary,
  },
  icon: {
    marginRight: 10,
  },
  text: lang => ({
    width: '90%',
    padding: Platform.OS === 'android' ? 7 : 10,
    textAlign: lang === LANGUAGES[1].code ? 'right' : 'left',
  }),
});

export default AppTextInput;
