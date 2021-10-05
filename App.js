import React from 'react';
import {StatusBar} from 'react-native';
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
