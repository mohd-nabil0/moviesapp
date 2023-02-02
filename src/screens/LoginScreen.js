import React from 'react';
import {StyleSheet, Image, View, ImageBackground} from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import {Form, FormField, SubmitButton} from '../components/forms';
import {useDispatch} from 'react-redux';
import {updateUser} from '../store/UserReducer';
import {useNavigation} from '@react-navigation/native';
import defaultStyles from '../config/styles';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string()
    .required()
    .min(8)
    .max(15)
    .matches(/^(?=.*[A-Z])/, 'Must Contain One Uppercase')
    .matches(/^(?=.*[!@#\$%\^&\*])/, 'Must Contain One Special Case Character')
    .label('Password'),
});

function LoginScreen(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={defaultStyles.imgBackground}
      resizeMode="cover"
      source={require('../assets/background.jpeg')}>
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
          validationSchema={validationSchema}>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <View style={styles.button}>
            <SubmitButton title="Login" validation={['name', 'email']} />
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
  button: {
    width: 280,
    marginTop: 15,
    alignSelf: 'center',
  },
});

export default LoginScreen;
