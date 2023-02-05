import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Screen from '../components/Screen';
import {LOGIN_SCREEN, MOVIES_SCREEN} from '../navigations/Routes';
import {getLanguage} from '../store/LanguageReducer';
import {getUser} from '../store/UserReducer';
import defaultStyles from '../theme/styles';
import {setDefaultLanguage} from '../utils/helper';
import Loader from '../components/Loader';

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

  //Function 'handleLanguage', apply the default language and
  //navigate to LoginScreen or MoviesScreen based on the user's session
  const handleLanguage = () => {
    if (!loading && !updatingLanguage) {
      setDefaultLanguage(i18n, selectedLanguage);
      navigation.reset({
        index: 0,
        routes: [{name: user ? MOVIES_SCREEN : LOGIN_SCREEN}],
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
          <Loader />
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
