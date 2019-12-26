import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getRegionForCoordinates, LongLat } from '../utility'
import globalStyles from '../styles/global'


export default function MapViewResults({ navigation }) {
  const filterAvailableStations = navigation.dangerouslyGetParent().getParam('filterAvailableStations');
  if (filterAvailableStations) {
    const points: LongLat[] = filterAvailableStations.map(station => {
      const point: LongLat = {
        long: station.long,
        lat: station.lat
      }
      return point
    })
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={getRegionForCoordinates(points)}
      >
        {filterAvailableStations.map(station => (
          <Marker
            coordinate={{ longitude: station.long, latitude: station.lat }}
            title={station.name}
            description={station.address}
            key={station.id}
          />
        ))}
      </MapView>
    );
  }
}

MapViewResults.navigationOptions = {
  title: 'Map'
}