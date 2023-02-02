import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import defaultStyles from '../config/styles';
import Screen from '../components/Screen';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../store/UserReducer';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = props => {
  const navigation = useNavigation();
  const {user, loading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (!loading) {
      navigation.reset({
        index: 0,
        routes: [{name: user ? 'MoviesScreen' : 'LoginScreen'}],
      });
    }
  }, [user, loading]);

  return (
    <ImageBackground
      style={defaultStyles.imgBackground}
      resizeMode="cover"
      source={require('../assets/background.jpeg')}>
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require('../assets/logo-red.png')} />
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'large'} />
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
