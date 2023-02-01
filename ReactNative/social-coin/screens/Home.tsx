import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { coins } from '../api';
import { BLACK_COLOR } from '../colors';
import Coin from '../components/Coin';

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
`;
const List = styled(FlatList as new () => FlatList<ICoin[]>)`
  padding: 20px 10px;
  width: 100%;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const { isLoading, data } = useQuery<ICoin[]>('coins', coins);
  const [cleanData, setCleanData] = useState<ICoin[]>([]);

  useEffect(() => {
    if (!data) return;
    setCleanData(
      data.filter((coin) => coin.rank !== 0 && coin.is_active && !coin.is_new)
    );
  }, [data]);
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color='white' size='large' />
      </Loader>
    );
  }
  return (
    <Container>
      <List
        //@ts-ignore
        data={cleanData}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item: ICoin) => item.id}
        renderItem={({ item, index }: { item: ICoin; index: number }) => (
          <Coin index={index} id={item.id} symbol={item.symbol} />
        )}
      />
    </Container>
  );
};

export default Home;
