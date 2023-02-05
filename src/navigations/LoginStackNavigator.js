import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MoviesScreen from '../screens/MoviesScreen';
import SplashScreen from '../screens/SplashScreen';
import {LOGIN_SCREEN, MOVIES_SCREEN, SPLASH_SCREEN} from './Routes';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName={SPLASH_SCREEN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={MOVIES_SCREEN} component={MoviesScreen} />
    </Stack.Navigator>
  );
};
