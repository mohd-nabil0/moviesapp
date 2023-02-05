import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {imageApi} from '../netwrok/Api';
import FastImage from 'react-native-fast-image';
import defaultStyles from '../theme/styles';
import colors from '../theme/colors';
import Card from './Card';

const MovieItem = ({movie}) => {
  return (
    <Card style={styles.container}>
      <>
        <FastImage
          source={{uri: imageApi(movie.poster_path)}}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
      </>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 12,
    marginHorizontal: 6,
    backgroundColor: colors.dark,
    alignItems: 'center',
    borderColor: colors.secondary,
    borderWidth: 0.8,
  },
  image: {
    width: '100%',
    height: 170,
  },
  title: {
    ...defaultStyles.text,
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 12,
  },
});
export default MovieItem;
