import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginStackNavigator from './LoginStackNavigator';
import AppStatusBar from '../components/AppStatusBar';
import colors from '../theme/colors';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <AppStatusBar backgroundColor={colors.black} barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="LoginStack"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginStack" component={LoginStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
