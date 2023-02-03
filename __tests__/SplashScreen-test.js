import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from '../src/screens/SplashScreen';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue({user: null, loading: false}),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

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

  it('renders correctly when user is not loaded and not loading', () => {
    useSelector.mockReturnValue({user: null, loading: false});
    const {getByTestId} = render(<SplashScreen />);
    expect(getByTestId('screen')).toBeTruthy();
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('renders correctly when user is loaded and not loading', () => {
    useSelector.mockReturnValue({user: {}, loading: false});
    const {getByTestId} = render(<SplashScreen />);
    expect(getByTestId('screen')).toBeTruthy();
    expect(useDispatch).toHaveBeenCalled();
  });
});
