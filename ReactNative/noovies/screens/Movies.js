import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

const Title = styled.Text`
  color: blue;
`;

const Movies = ({ navigation: { navigate } }) => {
  return (
    <Btn onPress={() => navigate('Stack', { screen: 'Three' })}>
      <Title>Moveis</Title>
    </Btn>
  );
};

export default Movies;
