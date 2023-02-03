import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';
import {LANGUAGES} from '../src/constants/Strings';
import {get, save} from '../src/utils/SharedPreferences';
import PreferenceKeys from '../src/constants/PreferenceKeys';

jest.mock('../src/navigations/RootNavigator', () => 'RootNavigator');
jest.mock('../src/utils/SharedPreferences', () => ({
  get: jest.fn(() => Promise.resolve(null)),
  save: jest.fn(),
}));

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('calls the SharedPreferences get method with the correct key', () => {
    render(<App />);
    expect(get).toHaveBeenCalledWith(PreferenceKeys.LANGUAGE);
  });

  it('calls the SharedPreferences save method with the correct key and value when language is not present in SharedPreferences', async () => {
    render(<App />);
    await (async () => {})();
    expect(save).toHaveBeenCalledWith(
      PreferenceKeys.LANGUAGE,
      JSON.stringify(LANGUAGES[0]),
    );
  });
});
