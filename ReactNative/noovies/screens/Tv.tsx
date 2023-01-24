import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { tvAPI } from '../api';

import Loader from '../components/Loader';

import HList from '../components/HList';
import { useQueryClient, useQuery } from 'react-query';

const Tv = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: isRefetchToday,
  } = useQuery(['tv', 'today'], tvAPI.getAiringTody);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: isRefetchTop,
  } = useQuery(['tv', 'top'], tvAPI.getTopRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchTrending,
  } = useQuery(['tv', 'trending'], tvAPI.getTrending);

  const onRefresh = () => {
    queryClient.refetchQueries(['tv']);
  };

  const loading = todayLoading || topLoading || trendingLoading;
  const refreshing = isRefetchToday || isRefetchTop || isRefetchTrending;

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title='Trending TV' data={trendingData.results} />
      <HList title='Airing Today' data={todayData.results} />
      <HList title='Top Rated TV' data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
