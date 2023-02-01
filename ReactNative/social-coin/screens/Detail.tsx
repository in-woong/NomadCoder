import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { VictoryChart, VictoryLine, VictoryScatter } from 'victory-native';
import { history, info } from '../api';
import { BLACK_COLOR } from '../colors';
import { Icon } from '../components/Coin';

const Container = styled.ScrollView`
  background-color: ${BLACK_COLOR};
`;

const Wrapper = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Detail = ({
  navigation,
  route: {
    params: { symbol, id },
  },
}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Icon
          source={{
            uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
          }}
        />
      ),
    });
  }, []);

  const { isLoading: infoLoading, data: infoData } = useQuery(
    ['coinInfo', id],
    info
  );
  const { isLoading: historyLoading, data: historyData } = useQuery(
    ['coinHistory', id],
    history
  );
  const [victoryData, setVictoryData] = useState([]);

  useEffect(() => {
    if (!historyData) return;
    setVictoryData(
      historyData.map((price) => ({
        x: new Date(price.timestamp).getTime(),
        y: price.price,
      }))
    );
  }, [historyData]);

  const isLoading = infoLoading || historyLoading;
  if (isLoading) {
    return (
      <Wrapper>
        <ActivityIndicator color='white' size='large' />
      </Wrapper>
    );
  }
  return (
    <Container>
      <VictoryChart height={360}>
        <VictoryLine
          animate
          interpolation='monotoneX'
          data={victoryData}
          style={{ data: { stroke: '#1abc9c' } }}
        />
        <VictoryScatter
          data={victoryData}
          style={{ data: { fill: '#1abc9c' } }}
        />
      </VictoryChart>
    </Container>
  );
};

export default Detail;
