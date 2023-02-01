import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';

import { BLACK_COLOR } from '../colors';
import Detail from '../screens/Detail';

const Nav = createNativeStackNavigator();

const InNav = () => (
  <Nav.Navigator
    screenOptions={{
      presentation: 'modal',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: BLACK_COLOR },
    }}
  >
    <Nav.Screen name='코인' component={Home} />
    <Nav.Screen name='Detail' component={Detail} />
  </Nav.Navigator>
);

export default InNav;
