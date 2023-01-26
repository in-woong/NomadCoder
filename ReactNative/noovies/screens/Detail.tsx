import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  Share,
  useColorScheme,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { Movie, MovieDetails, moviesAPI, TV, tvAPI, TVDetails } from '../api';
import { BLACK_COLOR, DARK_GRAY_COLOR } from '../colors';
import Loader from '../components/Loader';
import Poster from '../components/Poster';
import { makeImagePath } from '../utils';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  justify-content: flex-end;
  height: ${SCREEN_HEIGHT / 4}px;
  padding: 0px 20px;
`;

const Background = styled.Image``;
const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

const Data = styled.View``;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isAndroid = Platform.OS === 'android';
  const isDark = useColorScheme() === 'dark';
  const isMovie = 'original_title' in params;

  const { isLoading, data } = useQuery<MovieDetails | TVDetails>(
    [isMovie ? 'movies' : 'tv', params.id],
    isMovie ? moviesAPI.detail : tvAPI.detail
  );

  const shareMedia = async () => {
    if (!data) return;
    const hompage =
      isMovie && 'imdb_id' in data
        ? `https://www.imdb.com/title/${data.imdb_id}`
        : data.homepage;

    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out :${hompage}`,
        title: 'original_title' in params ? 'Movie' : 'TV Show',
      });
    } else {
      await Share.share({
        url: hompage,
        title: 'original_title' in params ? 'Movie' : 'TV Show',
      });
    }
  };

  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons
        name='share-outline'
        color={isDark ? 'white' : BLACK_COLOR}
        size={24}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show',
    });
  }, []);

  useEffect(() => {
    {
      data &&
        setOptions({
          headerRight: () => <ShareButton />,
        });
    }
  }, [data]);
  const openYTLink = async (videoId: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImagePath(params.backdrop_path || '') }}
        />
        <LinearGradient
          colors={['transparent', BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ''} />
          <Title>
            {'original_title' in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons
              name='logo-youtube'
              color={isDark ? 'white' : DARK_GRAY_COLOR}
              size={24}
            />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
