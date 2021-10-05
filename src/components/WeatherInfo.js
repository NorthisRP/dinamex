import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {global} from './../styles/global';

export default function WeatherView({info, title}) {
  return (
    <Card style={[global.column, {marginBottom: 24}]}>
      <Title style={[style.cardTitle, {fontSize: 28}]}>{title}</Title>
      <View style={global.row}>
        <Title style={[style.cardTitle, {fontSize: 24}]}>{info.name}</Title>
        <Image
          style={style.image}
          source={{
            uri: `https://openweathermap.org/img/w/${info.icon}.png`,
          }}
        />
      </View>
      <View style={style.cardInfo}>
        <Title style={style.cardTitle}>Temperature - {info.temp} °C</Title>
      </View>
      <View style={style.cardInfo}>
        <Title style={style.cardTitle}>Humidity - {info.humidity}%</Title>
      </View>
      <View style={style.cardInfo}>
        <Title style={style.cardTitle}>Description - {info.desc}</Title>
      </View>
    </Card>
  );
}

const style = StyleSheet.create({
  cardInfo: {
    margin: 5,
    padding: 8,
    width: 300,
    backgroundColor: '#efefef',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  cardTitle: {color: '#00aaff', fontSize: 18, textAlign: 'center'},
  image: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 180,
    margin: 10,
  },
});
