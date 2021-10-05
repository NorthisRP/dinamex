import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import WeatherView from './screens/WeatherView';
import Account from './screens/Account';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="AppRoute"
      screenOptions={{
        tabBarLabelStyle: {fontSize: 17, color: 'white'},
        tabBarStyle: {backgroundColor: '#00aaff'},
      }}>
      <Tab.Screen
        name="WeatherView"
        component={WeatherView}
        options={{tabBarLabel: 'WeatherView'}}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{tabBarLabel: 'Account'}}
      />
    </Tab.Navigator>
  );
}

export function NavigateTabs() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
