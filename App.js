import React from 'react';
import {StatusBar} from 'react-native';
import Header from './src/components/Header';
import WeatherView from './src/screens/WeatherView';
import Account from './src/screens/Account';
import {NavigateTabs} from './src/route';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
      <NavigateTabs />
    </>
  );
};

export default App;
