import {SafeAreaView, StatusBar, View} from 'react-native';
import {STATUSBAR_HEIGHT} from '../constants/Strings';

const AppStatusBar = ({backgroundColor, ...props}) => (
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

export default AppStatusBar;
