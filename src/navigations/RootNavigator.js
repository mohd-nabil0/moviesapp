import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginStackNavigator from './LoginStackNavigator';
import {View, SafeAreaView, StatusBar} from 'react-native';
import colors from '../config/colors';

const Stack = createNativeStackNavigator();
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 50 : 56;

export default () => {
  const MyStatusBar = ({backgroundColor, ...props}) => (
    <View
      style={{
        height: STATUSBAR_HEIGHT,
        backgroundColor,
      }}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  return (
    <NavigationContainer>
      <MyStatusBar backgroundColor={colors.black} barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="LoginStack"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginStack" component={LoginStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
