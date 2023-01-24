import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Dimensions, FlatList, View } from 'react-native';

import Slide from '../components/Slide';

import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import { Movie, MovieResponse, moviesAPI } from '../api';
import { useQueryClient, useQuery } from 'react-query';

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  margin-left: 16px;
  margin-bottom: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(
    ['movies', 'nowPlaying'],
    moviesAPI.getNowPlaying
  );
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(['movies', 'upcoming'], moviesAPI.getUpcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(['movies', 'trending'], moviesAPI.getTrending);

  const onRefresh = async () => {
    queryClient.refetchQueries(['movies']);
  };

  const renderVMedia = ({ item }: { item: Movie }) => (
    <VMedia
      key={item.id}
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );

  const renderHMedia = ({ item }: { item: Movie }) => (
    <HMedia
      posterPath={item.poster_path}
      releaseDate={item.release_date}
      originalTitle={item.original_title}
      overview={item.overview}
    />
  );

  const movieKeyExtractor = (item: Movie) => item.id + '';

  const loading = trendingLoading || upcomingLoading || nowPlayingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming;

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    upcomingData && (
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
                  />
                ))}
            </Swiper>
            <ListContainer>
              <ListTitle>Trending Movie</ListTitle>
              {trendingData && (
                <FlatList
                  data={trendingData.results}
                  keyExtractor={movieKeyExtractor}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingLeft: 30 }}
                  ItemSeparatorComponent={VSeparator}
                  renderItem={renderVMedia}
                />
              )}
            </ListContainer>
            <ListTitle>Coming Soon</ListTitle>
          </>
        }
        data={upcomingData.results}
        keyExtractor={movieKeyExtractor}
        ItemSeparatorComponent={HSeparator}
        renderItem={renderHMedia}
      />
    )
  );
};

export default Movies;
