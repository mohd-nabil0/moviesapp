import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart'; // Import package from node modules
import PreferenceKeys from '../constants/PreferenceKeys';
import {LANGUAGES} from '../constants/Strings';
import {save} from './SharedPreferences';

//function `setDefaultLanguage` that takes a parameter `language`.
export function setDefaultLanguage(i18n, language) {
  // Use the `changeLanguage` method of `i18n` to change the language to the code of `language`.
  i18n.changeLanguage(language.code);

  // Use the `forceRTL` method of `I18nManager` to force the RTL layout, if the code of `language` is equal to the code of the second language in the `LANGUAGES` array.
  I18nManager.forceRTL(language.code === LANGUAGES[1].code);
}

// Asynchronous function `changeLanguage` that takes two parameters `selectedLanguage` and `language`.
export async function changeLanguage(selectedLanguage, language) {
  // Check if the code of `selectedLanguage` is not equal to the code of `language`.
  if (selectedLanguage.code !== language.code) {
    // Use the `save` method to save the stringified `language` under the `PreferenceKeys.LANGUAGE` key.
    await save(PreferenceKeys.LANGUAGE, JSON.stringify(language));

    // Use the `forceRTL` method of `I18nManager` to force the RTL layout, if the code of `language` is equal to the code of the second language in the `LANGUAGES` array.
    I18nManager.forceRTL(language.code === LANGUAGES[1].code);
  }
}
//Function `restartAPP` that restarts the React Native app.
export function restartAPP() {
  // Use the `restart` method of `RNRestart` to restart the app.
  RNRestart.restart();
}
