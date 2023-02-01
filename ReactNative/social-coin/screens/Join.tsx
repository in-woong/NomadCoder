import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';

import styled from 'styled-components/native';
import { BLACK_COLOR } from '../colors';

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
  color: white;
  align-items: center;
  padding: 60px 20px;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;

  justify-content: center;
  align-items: center;

  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Join = () => {
  const passwordInput = useRef<TextInput>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmitEmailEditing = () => {
    passwordInput.current!.focus();
  };

  const onSubmitPasswordEditing = async () => {
    if (email === '' || password === '') {
      return Alert.alert('Fill in all the forms');
    }
    if (loading) return;
    try {
      setLoading(true);
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(userCredential);
    } catch (e) {
      console.log(e.code);
      switch (e.code) {
        case 'auth/weak-password': {
          Alert.alert('Write a stronger Password!!');
          break;
        }
        case 'auth/invalid-email': {
          Alert.alert('Write a right Email');
          break;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Input
        value={email}
        returnKeyType='next'
        autoCapitalize='none'
        autoCorrect={false}
        keyboardType='email-address'
        onChangeText={(text) => setEmail(text)}
        placeholder='Email'
        onSubmitEditing={onSubmitEmailEditing}
      />
      <Input
        ref={passwordInput}
        value={password}
        secureTextEntry
        returnKeyType='done'
        onChangeText={(text) => setPassword(text)}
        placeholder='Password'
        onSubmitEditing={onSubmitPasswordEditing}
      />
      <Btn onPress={onSubmitPasswordEditing}>
        {loading ? <ActivityIndicator /> : <BtnText>Create Account</BtnText>}
      </Btn>
    </Container>
  );
};

export default Join;
