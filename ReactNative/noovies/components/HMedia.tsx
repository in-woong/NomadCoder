import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Movie, TV } from '../api';
import Poster from './Poster';
import Votes from './Votes';

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
  fullData: Movie | TV;
}

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  width: 90%;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 12px;
  margin: 10px 0;
`;

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  releaseDate,
  overview,
  voteAverage,
  fullData,
}) => {
  const navigation = useNavigation();

  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>{originalTitle}</Title>
          {releaseDate ? (
            <Release>
              {new Date(releaseDate).toLocaleDateString('ko', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}{' '}
            </Release>
          ) : null}
          {voteAverage ? <Votes votes={voteAverage} /> : null}
          <Overview>
            {overview !== '' && overview.length > 140
              ? `${overview.slice(0, 140)}...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

export default HMedia;
