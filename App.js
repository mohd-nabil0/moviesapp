import React from 'react';
import ConfigureStore from './src/store/ConfigureStore';
import RootNavigator from './src/navigations/RootNavigator';
import {Provider} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useEffect} from 'react';
import {get, save} from './src/utils/SharedPreferences';
import {LANGUAGES} from './src/constants/Strings';
import PreferenceKeys from './src/constants/PreferenceKeys';

const store = ConfigureStore();

const App = props => {
  const {i18n} = useTranslation();

  useEffect(() => {
    get(PreferenceKeys.LANGUAGE)
      .then(language => {
        if (!language)
          save(PreferenceKeys.LANGUAGE, JSON.stringify(LANGUAGES[0]));
        const lang = language ? JSON.parse(language) : LANGUAGES[0];
        i18n.changeLanguage(lang.code);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};
export default App;
