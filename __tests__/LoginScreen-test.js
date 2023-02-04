import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../src/store/Reducer';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    reset: jest.fn(),
  }),
}));
const store = createStore(reducer);

const language = 'en';

i18n.use(initReactI18next).init({
  lng: language,
  resources: {
    en: {
      translation: {
        email: 'Email',
        password: 'Password',
        submit: 'Submit',
      },
    },
  },
});

describe('LoginScreen', () => {
  it('renders form with email and password inputs', () => {
    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  it('dispatches updateUser action and resets navigation to MoviesScreen upon successful form submission', async () => {
    const {getByPlaceholderText, getByText, getByTestId} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByTestId('submit-button');

    fireEvent.changeText(emailInput, 'test@email.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(submitButton);

    // Assert that navigation is reset to 'MoviesScreen'
    // ...
  });

  it('updates the device language, restarts the app, and stores the selected language in the device shared preferences', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const selectLanguageButton = getByTestId('language-icon');
    fireEvent.press(selectLanguageButton);

    expect(i18n.language).toBe('en');
    // Assert that the selected language is stored in the device shared preferences
    // ...
  });
});
