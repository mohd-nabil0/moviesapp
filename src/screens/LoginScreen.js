import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';
import RNRestart from 'react-native-restart'; // Import package from node modules
import Screen from '../components/Screen';
import {Form, FormField, SubmitButton} from '../components/forms';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../store/UserReducer';
import {useNavigation} from '@react-navigation/native';
import defaultStyles from '../config/styles';
import {useTranslation} from 'react-i18next';
import '../translation/i18n';
import BottomSheetModal from '../components/BottomSheetModal';
import {LANGUAGES} from '../constants/Strings';
import colors from '../config/colors';
import {save} from '../utils/SharedPreferences';
import PreferenceKeys from '../constants/PreferenceKeys';

const validationSchema = t =>
  Yup.object().shape({
    email: Yup.string()
      .max(50, t('email_50'))
      .required(t('emailRequired'))
      .email()
      .label('Email'),
    password: Yup.string()
      .required(t('passwordRequired'))
      .min(8, t('password_8'))
      .max(15, t('password_15'))
      .matches(/^(?=.*[A-Z])/, t('passwordUpperCase'))
      .matches(/^(?=.*[!@#\$%\^&\*])/, t('passwordSpecialCharacter'))
      .label('Password'),
  });

function LoginScreen(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const {selectedLanguage} = useSelector(state => state.languages);
  const [modalVisible, setModalVisible] = useState(false);

  const hanleLanguageSelection = async option => {
    if (selectedLanguage.code !== option.code) {
      await save(PreferenceKeys.LANGUAGE, JSON.stringify(option));
      await I18nManager.forceRTL(option.code === LANGUAGES[1].code);
      RNRestart.restart();
    }
    setModalVisible(false);
  };

  return (
    <ImageBackground
      style={defaultStyles.imgBackground}
      resizeMode="cover"
      source={require('../assets/background.jpeg')}>
      <BottomSheetModal
        headerTitle={t('selectLanguage')}
        defaultValue={selectedLanguage}
        options={LANGUAGES}
        visible={modalVisible}
        onRequestClose={option => hanleLanguageSelection(option)}
      />
      <TouchableOpacity
        style={styles.languageIcon}
        onPress={() => setModalVisible(true)}
        testID="language-icon">
        <Icon name="language-sharp" size={24} color={colors.white} />
      </TouchableOpacity>
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require('../assets/logo-red.png')} />

        <Form
          initialValues={{email: '', password: ''}}
          onSubmit={values => {
            dispatch(updateUser(JSON.stringify(values)));
            navigation.reset({
              index: 0,
              routes: [{name: 'MoviesScreen'}],
            });
          }}
          validationSchema={validationSchema.bind(this, t)}>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="password"
            secureTextEntry
            textContentType="password"
          />
          <View style={styles.button}>
            <SubmitButton
              title={t('login')}
              validation={['name', 'email']}
              testID="submit-button"
            />
          </View>
        </Form>
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 70,
    marginTop: '25%',
  },
  languageIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '`rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 10,
    zIndex: 1000,
  },
  button: {
    width: 280,
    marginTop: 15,
    alignSelf: 'center',
  },
});

export default LoginScreen;
