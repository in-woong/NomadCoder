import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import { makeImagePath } from '../utils';
import { BlurView } from 'expo-blur';

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const API_KEY = 'f9f8d231a4ae3a7cf18f7b54467801d1';

const Container = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.View`
  width: 60%;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0,0,0,0.8)'};
`;

const Votes = styled(Overview)`
  font-size: 12px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);

  const isDark = useColorScheme() === 'dark';

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `http://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        showsButtons={false}
        loop
        autoplay
        autoplayTimeout={3.5}
        showsPagination={false}
        containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImagePath(movie.backdrop_path) }}
            />
            <BlurView
              tint={isDark ? 'dark' : 'light'}
              intensity={80}
              style={StyleSheet.absoluteFill}
            >
              <Wrapper>
                <Poster source={{ uri: makeImagePath(movie.poster_path) }} />
                <Column>
                  <Title isDark={isDark}>{movie.original_title}</Title>
                  {movie.vote_average > 0 ? (
                    <Votes isDark={isDark}>⭐️{movie.vote_average}/10</Votes>
                  ) : null}
                  <Overview isDark={isDark}>
                    {movie.overview.slice(0, 100)}...
                  </Overview>
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
