import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheetModal from '../components/BottomSheetModal';
import Loader from '../components/Loader';
import MovieItem from '../components/MovieItem';
import Screen from '../components/Screen';
import AppText from '../components/Text';
import PreferenceKeys from '../constants/PreferenceKeys';
import {APPBAR_HEIGHT, LANGUAGES} from '../constants/Strings';
import {LOGIN_SCREEN} from '../navigations/Routes';
import {getMovies} from '../store/MovieReducer';
import colors from '../theme/colors';
import defaultStyles from '../theme/styles';
import '../translation/i18n';
import {remove} from '../utils/SharedPreferences';
import {changeLanguage, restartAPP} from '../utils/helper';

const MovieScreen = props => {
  const {movies, page, totalPages, loading} = useSelector(
    state => state.movies,
  );
  const {selectedLanguage} = useSelector(state => state.languages);

  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const pageCalled = useRef(1);

  let onEndReachedCalledDuringMomentum = true;

  const navigation = useNavigation();
  const {t} = useTranslation();

  useEffect(() => {
    if (selectedLanguage) loadMovies(movies.length > 0);
  }, [selectedLanguage]);

  //Function 'hanleLanguageSelection', will close the language modal
  //and force apply the selected langauge text on the screen.
  const hanleLanguageSelection = async option => {
    setModalVisible(false);
    await changeLanguage(selectedLanguage, option);
    restartAPP();
  };

  //Function 'handleMore', check 'onEndReachedCalledDuringMomentum',
  //that scrolled the 3/4 screen of the list and 'pageCalled' will not
  //allowed the recall of the function.
  const handleMore = () => {
    if (!onEndReachedCalledDuringMomentum && pageCalled.current < page) {
      // console.log('Handle-More', page);
      pageCalled.current = pageCalled.current + 1;
      loadMovies();
      onEndReachedCalledDuringMomentum = true;
    }
  };

  //Function 'loadMovies' that takes in a parameter languageChange.
  //It checks if the value of totalPages exists and page is greater
  //than or equal to totalPages, in which case it returns without
  //doing anything. If not, it dispatches the action getMovies with
  //parameters page, languageCode and languageChange.
  const loadMovies = async languageChange => {
    if (totalPages && page >= totalPages) return;

    dispatch(
      getMovies({page, languageCode: selectedLanguage.code, languageChange}),
    );
  };

  //Function 'handleHeader', show extra space header for design.
  const handleHeader = () => <View style={styles.header} />;

  //Function 'handleFooter', show 'Loader' while fetching more data from server.
  const handleFooter = () => {
    return loading && <Loader />;
  };

  //Function 'handleLogout', remove saved user data and naviagte to 'LoginScreen'.
  const handleLogout = () => {
    remove(PreferenceKeys.USER);
    navigation.reset({
      index: 0,
      routes: [{name: LOGIN_SCREEN}],
    });
  };

  //Function 'showAlert', will popup confirmation from the user to
  //logout. with the title and two options 'Yes' & 'No'.
  const showAlert = () => {
    Alert.alert(t('logoutText'), '', [
      {
        text: t('yes'),
        onPress: () => handleLogout(),
      },
      {text: t('no')},
    ]);
  };

  //Grid item to show Movie this image and title
  const renderItem = ({item}) => <MovieItem movie={item} />;

  return (
    <ImageBackground
      style={defaultStyles.imgBackground}
      resizeMode="cover"
      source={require('../assets/background.jpeg')}>
      {selectedLanguage && (
        <BottomSheetModal
          headerTitle={t('selectLanguage')}
          defaultValue={selectedLanguage}
          options={LANGUAGES}
          visible={modalVisible}
          onRequestClose={option => hanleLanguageSelection(option)}
        />
      )}
      <Screen style={styles.container}>
        <View style={styles.appBar}>
          <AppText style={styles.titleText} testID={'headerTitle'}>
            {t('homeTitle')}{' '}
          </AppText>
          <TouchableOpacity
            onPress={() => showAlert()}
            testID="logout-icon"
            style={styles.logoutContainer}>
            <Icon name="power" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            testID="language-icon">
            <Icon name="language-sharp" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.list}
          data={movies}
          renderItem={renderItem}
          numColumns={2}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum = false;
          }}
          keyExtractor={(item, index) => item.id}
          onEndReached={handleMore}
          onEndReachedThreshold={0.75}
          ListHeaderComponent={handleHeader}
          ListFooterComponent={handleFooter}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  appBar: {
    flexDirection: 'row',
    height: APPBAR_HEIGHT,
    backgroundColor: `rgba(0,0,0,0.8)`,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  titleText: {
    flex: 1,
    color: colors.white,
    fontWeight: '700',
    marginEnd: 20,
  },
  list: {
    paddingHorizontal: 3,
  },
  header: {
    height: APPBAR_HEIGHT + 10,
  },
  logoutContainer: {
    marginHorizontal: 10,
  },
});
export default MovieScreen;
