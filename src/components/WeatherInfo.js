import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {global} from './../styles/global';

export default function WeatherView({info}) {
  return (
    <View style={global.column}>
      <View style={global.row}>
        <Title style={[style.cardTitle, {fontSize: 24}]}>{info.name}</Title>
        <Image
          style={style.image}
          source={{
            uri: `https://openweathermap.org/img/w/${info.icon}.png`,
          }}
        />
      </View>
      <Card style={style.cardInfo}>
        <Title style={style.cardTitle}>Temperature - {info.temp} °C</Title>
      </Card>
      <Card style={style.cardInfo}>
        <Title style={style.cardTitle}>Humidity - {info.humidity}%</Title>
      </Card>
      <Card style={style.cardInfo}>
        <Title style={style.cardTitle}>Description - {info.desc}</Title>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  cardInfo: {margin: 5, padding: 8, width: 300},
  cardTitle: {color: '#00aaff', fontSize: 18, textAlign: 'center'},
  image: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 180,
    margin: 10,
  },
});
