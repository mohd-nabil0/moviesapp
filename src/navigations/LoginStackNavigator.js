import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MoviesScreen from '../screens/MoviesScreen';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getUser} from '../store/UserReducer';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName={'SplashScreen'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen name={'MoviesScreen'} component={MoviesScreen} />
    </Stack.Navigator>
  );
};
