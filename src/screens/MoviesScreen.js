import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useEffect} from 'react';
import {useState} from 'react';
import {fetchMovies} from '../api/Api';
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

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 50 : 56;

const MovieScreen = props => {
  const [movies, setMovies] = useState([]);
  const [page, setpage] = useState(1);
  const [totalPages, setTotalpages] = useState();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLangauge] = useState();

  let onEndReachedCalledDuringMomentum = true;

  const {t, i18n} = useTranslation();

  useEffect(() => {
    if (selectedLanguage) loadMovies();
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
      setMovies([]);
      setpage(1);
      save(PreferenceKeys.LANGUAGE, JSON.stringify(option));
      i18n
        .changeLanguage(option.code)
        .then(() => setSelectedLangauge(option))
        .catch(err => console.log(err));
    }
  };

  const handleMore = () => {
    if (!onEndReachedCalledDuringMomentum) {
      setLoading(true);
      loadMovies();
      onEndReachedCalledDuringMomentum = true;
    }
  };

  const loadMovies = async () => {
    if (totalPages && page >= totalPages) return;

    const {result, error} = await fetchMovies(page, selectedLanguage.code);
    setLoading(false);

    if (error) return alert(error);

    const _m = result?.results || [];
    setMovies([...movies, ..._m]);

    setTotalpages(result?.total_pages || 1);
    setpage(prev => prev + 1);
  };

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
          <AppText style={styles.titleText}>{t('homeTitle')} </AppText>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
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
          onEndReachedThreshold={1.5}
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
    paddingTop: APPBAR_HEIGHT + 10,
    paddingHorizontal: 3,
  },
});
export default MovieScreen;
