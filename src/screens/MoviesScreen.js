import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';
import MovieItem from '../components/MovieItem';
import Screen from '../components/Screen';
import colors from '../config/colors';
import defaultStyles from '../config/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheetModal from '../components/BottomSheetModal';
import {get, save} from '../utils/SharedPreferences';
import PreferenceKeys from '../constants/PreferenceKeys';
import AppText from '../components/Text';
import {LANGUAGES} from '../constants/Strings';
import {useTranslation} from 'react-i18next';
import '../translation/i18n';
import {getMovies} from '../store/MovieReducer';
import {useSelector, useDispatch} from 'react-redux';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 50 : 56;

const MovieScreen = props => {
  const {movies, page, totalPages, loading} = useSelector(
    state => state.movies,
  );
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLangauge] = useState();
  const flatListRef = useRef();
  const pageCalled = useRef(1);

  let onEndReachedCalledDuringMomentum = true;

  const {t, i18n} = useTranslation();

  useEffect(() => {
    if (selectedLanguage) loadMovies(movies.length > 0);
  }, [selectedLanguage]);

  useEffect(() => {
    fetchLangauge();
  }, []);

  const fetchLangauge = async () => {
    const lang = await get(PreferenceKeys.LANGUAGE);
    if (lang) {
      const _lang = JSON.parse(lang);
      setSelectedLangauge(_lang);
    }
  };

  const hanleLanguageSelection = option => {
    setModalVisible(false);

    if (selectedLanguage.code !== option.code) {
      save(PreferenceKeys.LANGUAGE, JSON.stringify(option));
      i18n
        .changeLanguage(option.code)
        .then(() => {
          toTop();
          setSelectedLangauge(option);
          pageCalled.current = 1;
        })
        .catch(err => console.log(err));
    }
  };

  const handleMore = () => {
    if (!onEndReachedCalledDuringMomentum && pageCalled.current < page) {
      console.log('Handle-More', page);
      pageCalled.current = pageCalled.current + 1;
      loadMovies();
      onEndReachedCalledDuringMomentum = true;
    }
  };

  const loadMovies = async languageChange => {
    if (totalPages && page >= totalPages) return;

    dispatch(
      getMovies({page, languageCode: selectedLanguage.code, languageChange}),
    );
  };

  const handleHeader = () => <View style={styles.header} />;

  const handleFooter = () => {
    return (
      loading && (
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      )
    );
  };

  const renderItem = ({item}) => <MovieItem movie={item} />;

  const toTop = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

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
            onPress={() => setModalVisible(true)}
            testID="language-icon">
            <Icon name="language-sharp" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        <FlatList
          ref={flatListRef}
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
    // paddingTop: APPBAR_HEIGHT + 10,
    paddingHorizontal: 3,
    // paddingBottom: 50,
  },
  header: {
    height: APPBAR_HEIGHT + 10,
  },
});
export default MovieScreen;
