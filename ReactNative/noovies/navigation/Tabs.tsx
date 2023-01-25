import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Moveis from '../screens/Movies';
import Search from '../screens/Search';
import Tv from '../screens/Tv';

import { Ionicons } from '@expo/vector-icons';
import {
  BLACK_COLOR,
  DARK_GRAY_COLOR,
  LIGHT_GRAY_COLOR,
  YELLOW_COLOR,
} from '../colors';
import { useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : 'white',
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white',
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GRAY_COLOR : LIGHT_GRAY_COLOR,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white',
        },
        headerTitleStyle: {
          color: isDark ? 'white' : BLACK_COLOR,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 10,
          fontWeight: '600',
        },
      }}
      initialRouteName='Movies'
    >
      <Tab.Screen
        name='Movies'
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'film' : 'film-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        component={Moveis}
      />
      <Tab.Screen
        name='Tv'
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'tv' : 'tv-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        component={Tv}
      />
      <Tab.Screen
        name='Search'
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        component={Search}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
