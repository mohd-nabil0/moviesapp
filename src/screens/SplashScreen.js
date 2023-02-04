import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  I18nManager,
} from 'react-native';
import defaultStyles from '../config/styles';
import Screen from '../components/Screen';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../store/UserReducer';
import {useNavigation} from '@react-navigation/native';
import {getLanguage} from '../store/LanguageReducer';
import {useTranslation} from 'react-i18next';
import {LANGUAGES} from '../constants/Strings';

const SplashScreen = props => {
  const {i18n} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  const {user, loading} = state.user;
  const {selectedLanguage, updatingLanguage} = state.languages;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getLanguage());
  }, []);

  useEffect(() => {
    handleLanguage();
  }, [user, loading, updatingLanguage]);

  const handleLanguage = () => {
    if (!loading && !updatingLanguage) {
      i18n.changeLanguage(selectedLanguage.code);
      I18nManager.forceRTL(selectedLanguage.code === LANGUAGES[1].code);
      navigation.reset({
        index: 0,
        routes: [{name: user ? 'MoviesScreen' : 'LoginScreen'}],
      });
    }
  };
  return (
    <ImageBackground
      style={defaultStyles.imgBackground}
      resizeMode="cover"
      testID="screen"
      source={require('../assets/background.jpeg')}>
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require('../assets/logo-red.png')} />
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'large'} testID="activity-indicator" />
        </View>
      </Screen>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  indicatorContainer: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 40,
  },
});

export default SplashScreen;
