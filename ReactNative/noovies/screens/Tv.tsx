import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { tvAPI } from '../api';

import Loader from '../components/Loader';

import HList from '../components/HList';
import { useQueryClient, useQuery } from 'react-query';

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: todayLoading, data: todayData } = useQuery(
    ['tv', 'today'],
    tvAPI.getAiringTody
  );
  const { isLoading: topLoading, data: topData } = useQuery(
    ['tv', 'top'],
    tvAPI.getTopRated
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ['tv', 'trending'],
    tvAPI.getTrending
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['tv']);
    setRefreshing(false);
  };

  const loading = todayLoading || topLoading || trendingLoading;

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
