import React, { useState } from 'react';
import styled from 'styled-components/native';

import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, FlatList } from 'react-native';

import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import { Movie, MovieResponse, moviesAPI } from '../api';
import { useQueryClient, useQuery } from 'react-query';
import HList from '../components/HList';

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 16px;
  margin-bottom: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const renderHMedia = ({ item }: { item: Movie }) => (
  <HMedia
    posterPath={item.poster_path || ''}
    releaseDate={item.release_date}
    originalTitle={item.original_title}
    overview={item.overview}
    fullData={item}
  />
);

const movieKeyExtractor = (item: Movie) => item.id + '';

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesAPI.getNowPlaying);
  const { isLoading: upcomingLoading, data: upcomingData } =
    useQuery<MovieResponse>(['movies', 'upcoming'], moviesAPI.getUpcoming);
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(['movies', 'trending'], moviesAPI.getTrending);

  const onRefresh = async () => {
    setRefreshing(true);
    queryClient.refetchQueries(['movies']);
    setRefreshing(false);
  };

  const loading = trendingLoading || upcomingLoading || nowPlayingLoading;

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            showsButtons={false}
            loop
            autoplay
            autoplayTimeout={3.5}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: '100%',
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData &&
              nowPlayingData.results.map((movie) => (
                <Slide
                  key={movie.id}
                  backdropPath={movie.backdrop_path || ''}
                  posterPath={movie.poster_path || ''}
                  originalTitle={movie.original_title}
                  voteAverage={movie.vote_average}
                  overview={movie.overview}
                  fullData={movie}
                />
              ))}
          </Swiper>
          {trendingData && (
            <HList title='Trending Movie' data={trendingData.results} />
          )}

          <ListTitle>Coming Soon</ListTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  ) : null;
};

export default Movies;
