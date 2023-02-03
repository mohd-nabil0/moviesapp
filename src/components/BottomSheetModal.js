import React, {useState} from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import defaultStyle from '../config/styles';
import colors from '../config/colors';
import AppText from './Text';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import {useTranslation} from 'react-i18next';

const BottomSheetModal = ({
  headerTitle,
  visible,
  defaultValue,
  options,
  onRequestClose,
}) => {
  const {t, i18n} = useTranslation();

  const [selectedItem, setSelectedItem] = useState(defaultValue);

  const handlePressButton = () => {
    onRequestClose(selectedItem);
  };

  const handlePressBackdrop = () => {
    onRequestClose(selectedItem);
  };

  const Option = ({option, borderBottom = true}) => {
    const check = selectedItem.label === option.label;
    return (
      <TouchableOpacity
        onPress={() => setSelectedItem(option)}
        style={[
          styles.optionContainer,
          borderBottom && styles.optionContainerBottomWidth,
        ]}>
        <AppText style={styles.optionText}>{option.label}</AppText>
        <View style={styles.optionIcon}>
          <Icon
            name={
              check
                ? 'ios-checkmark-circle-sharp'
                : 'ios-radio-button-off-sharp'
            }
            size={20}
            color={colors.primary}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback
        onPress={() => handlePressBackdrop()}
        testID="backdrop">
        <View style={styles.backdrop}>
          <View style={styles.modalContainer}>
            <AppText style={styles.modalContainerTitle}>{headerTitle}</AppText>

            <View style={{marginVertical: 10}}>
              {options.map((option, index) => (
                <Option
                  key={index.toString()}
                  option={option}
                  borderBottom={index < options.length - 1}
                />
              ))}
            </View>
            <View style={styles.button}>
              <Button
                testID="change-language"
                title={t('done')}
                onPress={() => handlePressButton()}
                disable={false}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: `rgba(0,0,0,0.5)`,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    minHeight: 180,
    maxHeight: 600,
    borderRadius: 20,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 20,
  },
  modalContainerTitle: {
    ...defaultStyle,
    fontSize: 18,
    fontWeight: '700',
  },
  optionText: {
    width: '85%',
    color: colors.black,
    fontSize: 15,
    fontWeight: '400',
  },
  optionIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContainerBottomWidth: {
    borderBottomWidth: 1,
    borderBottomColor: colors.disable,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  button: {
    width: 180,
    alignSelf: 'center',
  },
});

export default BottomSheetModal;
