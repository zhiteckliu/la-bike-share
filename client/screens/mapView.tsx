import React from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

import globalStyles from '../styles/global'


export default function MapViewResults({ navigation }) {

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
}

MapViewResults.navigationOptions = {
  title: 'Map'
}