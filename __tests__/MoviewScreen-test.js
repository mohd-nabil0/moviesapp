import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getMovies} from '../src/store/MovieReducer';
import MovieScreen from '../src/screens/MoviesScreen';
import {render, fireEvent} from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    reset: jest.fn(),
  }),
}));
jest.mock('react-redux', () => {
  return {
    useSelector: jest.fn().mockReturnValue({
      selectedLanguage: {code: 'en'},
      movies: {
        movies: [],
        page: 1,
        totalPages: 1,
        loading: false,
      },
    }),
    useDispatch: jest.fn().mockReturnValue(jest.fn()),
  };
});

jest.mock('../src/store/MovieReducer', () => {
  return {
    getMovies: jest.fn(),
  };
});

describe('MovieScreen', () => {
  it('should render correctly', () => {
    const {getByTestId, queryByTestId} = render(<MovieScreen />);
    expect(getByTestId('headerTitle')).toBeTruthy();
    expect(queryByTestId('language-icon')).toBeTruthy();
  });

  it('should open language modal when language icon is pressed', () => {
    const {getByTestId} = render(<MovieScreen />);
    fireEvent.press(getByTestId('language-icon'));
    expect(getByTestId('modalContainer')).toBeTruthy();
  });

  it('should dispatch getMovies action when component is mounted', () => {
    render(<MovieScreen />);
    expect(useDispatch).toHaveBeenCalled();
    expect(getMovies).toHaveBeenCalled();
  });
});
