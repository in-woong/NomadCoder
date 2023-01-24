import React from 'react';
import { Text, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';

import { NavigationContainer } from '@react-navigation/native';

import Root from './navigation/Root';

import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './style';

import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  const [assets, assetsError] = useAssets([require('./image.png')]);
  const [loaded, fontError] = useFonts(Ionicons.font);

  const isDark = useColorScheme() === 'dark';

  if (!assets || !loaded) {
    return <Text>Loading</Text>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
