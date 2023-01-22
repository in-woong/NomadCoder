import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Moveis from '../screens/Movies';
import Search from '../screens/Search';
import Tv from '../screens/Tv';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 12,
          fontWeight: 600,
        },
      }}
      initialRouteName='Search'
    >
      <Tab.Screen
        name='MOVIES'
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
        name='TV'
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
        name='SEARCH'
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
