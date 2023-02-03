import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react-native';
import MovieScreen from '../src/screens/MoviesScreen';
import MovieReducer from '../src/store/MovieReducer';

const store = createStore(MovieReducer);

describe('MovieScreen', () => {
  it('should render correctly', () => {
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <MovieScreen />
      </Provider>,
    );

    // Check if the header text is displayed
    expect(getByTestId('headerTitle')).toBeTruthy();

    // Check if the language button is displayed
    expect(getByTestId('language-icon')).toBeTruthy();
  });

  it('should show language modal', () => {
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <MovieScreen />
      </Provider>,
    );
    // Open the language modal by pressing the language button
    fireEvent.press(getByTestId('language-icon'));
  });
});
