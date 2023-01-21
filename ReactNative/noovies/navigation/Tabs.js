import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Moveis from '../screens/Movies';
import Search from '../screens/Search';
import Tv from '../screens/Tv';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarLabelStyle: { backgroundColor: 'red' },
      }}
      initialRouteName='Search'
    >
      <Tab.Screen
        name='Movies'
        options={{ tabBarLabelStyle: { backgroundColor: 'purple' } }}
        component={Moveis}
      />
      <Tab.Screen name='Tv' options={{ tabBarBadge: 4 }} component={Tv} />
      <Tab.Screen name='Search' component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
