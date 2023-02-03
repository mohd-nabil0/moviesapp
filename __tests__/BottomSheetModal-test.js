import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import BottomSheetModal from '../src/components/BottomSheetModal';

const options = [{label: 'Option 1'}, {label: 'Option 2'}, {label: 'Option 3'}];
const headerTitle = 'Header Title';
const defaultValue = options[0];
const onRequestClose = jest.fn();

describe('BottomSheetModal', () => {
  it('renders with correct header title, options, and default value', () => {
    const {getByText} = render(
      <BottomSheetModal
        headerTitle={headerTitle}
        visible={true}
        defaultValue={defaultValue}
        options={options}
        onRequestClose={onRequestClose}
      />,
    );
    expect(getByText(headerTitle)).toBeTruthy();
    options.forEach(option => {
      expect(getByText(option.label)).toBeTruthy();
    });
    expect(getByText(defaultValue.label)).toBeTruthy();
  });

  it('closes the modal on pressing the Done button', () => {
    const {getByTestId} = render(
      <BottomSheetModal
        headerTitle={headerTitle}
        visible={true}
        defaultValue={defaultValue}
        options={options}
        onRequestClose={onRequestClose}
      />,
    );
    fireEvent.press(getByTestId('change-language'));
    expect(onRequestClose).toHaveBeenCalledWith(defaultValue);
  });

  it('closes the modal on pressing the backdrop', () => {
    const {getByTestId} = render(
      <BottomSheetModal
        headerTitle={headerTitle}
        visible={true}
        defaultValue={defaultValue}
        options={options}
        onRequestClose={onRequestClose}
      />,
    );
    fireEvent.press(getByTestId('backdrop'));
    expect(onRequestClose).toHaveBeenCalledWith(defaultValue);
  });

  it('updates the selected item on pressing the option', () => {
    const {getByText, getByTestId} = render(
      <BottomSheetModal
        headerTitle={headerTitle}
        visible={true}
        defaultValue={defaultValue}
        options={options}
        onRequestClose={onRequestClose}
      />,
    );
    expect(getByText(options[1].label)).toBeTruthy();
    fireEvent.press(getByText(options[1].label));
  });
});
