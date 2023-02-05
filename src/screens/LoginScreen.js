import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import BottomSheetModal from '../components/BottomSheetModal';
import Screen from '../components/Screen';
import {Form, FormField, SubmitButton} from '../components/forms';
import {LANGUAGES} from '../constants/Strings';
import {SPECIAL_CHARACTER_REG, UPPER_CASE_REG} from '../constants/Validation';
import {MOVIES_SCREEN} from '../navigations/Routes';
import {updateUser} from '../store/UserReducer';
import colors from '../theme/colors';
import defaultStyles from '../theme/styles';
import '../translation/i18n';
import {changeLanguage, restartAPP} from '../utils/helper';

//Function 'validationSchema' which is assigned the result of invoking
//a function t and returning a Yup validation schema object.
//The schema object is defined as having two fields, email and password.
//The email field is defined using Yup string validation.
const validationSchema = t =>
  Yup.object().shape({
    email: Yup.string()
      .max(50, t('email_50'))
      .required(t('emailRequired'))
      .email(t('emailValid'))
      .label('Email'),
    password: Yup.string()
      .required(t('passwordRequired'))
      .min(8, t('password_8'))
      .max(15, t('password_15'))
      .matches(UPPER_CASE_REG, t('passwordUpperCase'))
      .matches(SPECIAL_CHARACTER_REG, t('passwordSpecialCharacter'))
      .label('Password'),
  });

function LoginScreen(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const {selectedLanguage} = useSelector(state => state.languages);
  const [modalVisible, setModalVisible] = useState(false);

  //Function 'hanleLanguageSelection', will close the language modal
  //and force apply the selected langauge text on the screen.
  const hanleLanguageSelection = async option => {
    setModalVisible(false);
    await changeLanguage(selectedLanguage, option);
    restartAPP();
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
              routes: [{name: MOVIES_SCREEN}],
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
    width: '100%',
    marginTop: 15,
    alignSelf: 'center',
  },
});

export default LoginScreen;
