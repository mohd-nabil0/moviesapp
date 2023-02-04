import React from 'react';
import {render, act, cleanup, waitFor} from '@testing-library/react-native';
import SplashScreen from '../src/screens/SplashScreen';
import thunk from 'redux-thunk';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import userReducer from '../src/store/UserReducer';
import languageReducer from '../src/store/LanguageReducer';

const rootReducer = combineReducers({
  user: userReducer,
  languages: languageReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    reset: jest.fn(),
  }),
}));
describe('SplashScreen', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render correctly and navigate to the correct screen', async () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <SplashScreen />
      </Provider>,
    );

    // Ensure that the activity indicator is displayed while data is loading
    const activityIndicator = getByTestId('activity-indicator');
    expect(activityIndicator).toBeTruthy();

    // Dispatch an action to update the user and language in the store
    act(() => {
      store.dispatch({
        type: 'SET_USER',
        payload: {user: {id: 1, name: 'User 1'}},
      });
    });
    act(() => {
      store.dispatch({
        type: 'SET_LANGUAGE',
        payload: {selectedLanguage: {code: 'en'}},
      });
    });
  });
});
