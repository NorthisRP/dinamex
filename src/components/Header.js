import * as React from 'react';
import {Appbar} from 'react-native-paper';

const Header = () => {
  return (
    <Appbar.Header style={{backgroundColor: '#00aaff'}}>
      <Appbar.BackAction />
      <Appbar.Content title="Weather App" color="white" />
      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
};

export default Header;
