import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';
import { BLACK_COLOR } from '../colors';

type RootStackParamList = {
  Join: any;
  Login: any;
};
type LoginScreenProps = NativeStackScreenProps<RootStackParamList>;

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
  color: white;
`;

const Wrapper = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text`
  font-size: 16px;
  text-align: center;
  color: white;
`;
const Btn = styled.TouchableOpacity``;

const BtnText = styled.Text`
  font-size: 16px;
  color: white;
`;

const Login: React.FC<LoginScreenProps> = ({ navigation: { navigate } }) => (
  <Container>
    <Wrapper>
      <Text>
        Don't have account?
        <Btn onPress={() => navigate('Join')}>
          <BtnText>Join &rarr;</BtnText>
        </Btn>
      </Text>
    </Wrapper>
  </Container>
);

export default Login;
