import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import type { Movie, TV } from '../api';
import VMedia from './VMedia';

interface HListProps {
  title: string;
  data: Movie[] | TV[];
  handleEndReached?: () => void;
}

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 16px;
  margin-bottom: 20px;
`;
const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const HListSeparator = styled.View`
  width: 20px;
`;

const HList: React.FC<HListProps> = ({ title, data, handleEndReached }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.8}
      //@ts-ignore
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      keyExtractor={(item: Movie | TV) => item.id + ''}
      ItemSeparatorComponent={HListSeparator}
      renderItem={({ item }: { item: Movie | TV }) => (
        <VMedia
          posterPath={item.poster_path || ''}
          originalTitle={
            'original_title' in item ? item.original_title : item.original_name
          }
          voteAverage={item.vote_average}
          fullData={item}
        />
      )}
    />
  </ListContainer>
);

export default HList;
