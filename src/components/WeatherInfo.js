import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {global} from '../styles/global.style';
import {weatherInfo} from './../styles/weatherInfo.style';

export default function WeatherView({info, title}) {
  return (
    <Card style={[global.column, {marginBottom: 24}]}>
      <Title style={[weatherInfo.cardTitle, {fontSize: 28}]}>{title}</Title>
      <View style={global.row}>
        <Title style={[weatherInfo.cardTitle, {fontSize: 24}]}>
          {info.name}
        </Title>
        <Image
          style={weatherInfo.image}
          source={{
            uri: `https://openweathermap.org/img/w/${info.icon}.png`,
          }}
        />
      </View>
      <View style={weatherInfo.cardInfo}>
        <Title style={weatherInfo.cardTitle}>
          Temperature - {info.temp} °C
        </Title>
      </View>
      <View style={weatherInfo.cardInfo}>
        <Title style={weatherInfo.cardTitle}>Humidity - {info.humidity}%</Title>
      </View>
      <View style={weatherInfo.cardInfo}>
        <Title style={weatherInfo.cardTitle}>Description - {info.desc}</Title>
      </View>
    </Card>
  );
}
