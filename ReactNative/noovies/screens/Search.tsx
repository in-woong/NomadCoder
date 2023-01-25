import React, { useState } from 'react';
import { useQuery } from 'react-query';

import styled from 'styled-components/native';
import { moviesAPI, tvAPI } from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: ${(props) => props.theme.secondBgColor};
  color: ${(props) => props.theme.secondTextColor};
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 15px auto;
  margin-bottom: 30px;
`;

const Search = () => {
  const [query, setQuery] = useState('');

  const onChangeText = (text: string) => setQuery(text);

  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: serachMovies,
  } = useQuery(['searchMovies', query], moviesAPI.search, { enabled: false });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(['searchTv', query], tvAPI.search, { enabled: false });

  const onSubmit = () => {
    if (query === '') {
      return;
    }
    serachMovies();
    searchTv();
  };

  const loading = moviesLoading || tvLoading;

  return (
    <Container>
      <SearchBar
        placeholder='Search for Movie or TV show'
        placeholderTextColor='grey'
        returnKeyType='search'
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          {moviesData && (
            <HList title='Movie Results' data={moviesData.results} />
          )}
          {tvData && <HList title='TV Results' data={tvData.results} />}
        </>
      )}
    </Container>
  );
};

export default Search;
