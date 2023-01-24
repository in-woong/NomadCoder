import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {};

const ScreenOne: React.FC<NativeStackScreenProps<any, 'ScreenOne'>> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate('Two')}>
    <Text>One</Text>
  </TouchableOpacity>
);

const ScreenTwo: React.FC<NativeStackScreenProps<any, 'ScreenTwo'>> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate('Three')}>
    <Text>Two</Text>
  </TouchableOpacity>
);

const ScreenThree: React.FC<NativeStackScreenProps<any, 'ScreenThree'>> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate('Tabs', { screen: 'SEARCH' })}>
    <Text>ChangeTitle</Text>
  </TouchableOpacity>
);
const NativeStack = createNativeStackNavigator();

const Stack: React.FC = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name='One' component={ScreenOne} />
    <NativeStack.Screen name='Two' component={ScreenTwo} />
    <NativeStack.Screen name='Three' component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
