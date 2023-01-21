import React from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';

import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';

export default function App() {
  const [assets, assetsError] = useAssets([require('./image.png')]);
  const [loaded, fontError] = useFonts(Ionicons.font);

  if (!assets || !loaded) {
    return <Text>Loading</Text>;
  }

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
