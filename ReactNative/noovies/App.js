import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { Font, useFonts } from 'expo-font';
import { Asset, useAssets } from 'expo-asset';

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.loadAsync(image);
  });

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [assets] = useAssets([require('./image.png')]);
  const [loaded, error] = useFonts(Ionicons.font);

  if (!assets || !loaded) {
    return <Text>Loading</Text>;
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <Text>Loading</Text>;
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}
    >
      <Text>SplashScreen Demo! 👏</Text>
      <Entypo name='rocket' size={30} />
    </View>
  );
}
