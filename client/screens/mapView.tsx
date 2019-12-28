import React, { Fragment, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import { getRegionForCoordinates, LongLat } from '../utility'
import StationItem from '../components/StationItem'
import { onStationItemPress, calcRadiusFactor } from '../utility'
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
    const initialRegion = getRegionForCoordinates(points);
    const [radiusFactor, setRadiusFactor] = useState(calcRadiusFactor(initialRegion.latitudeDelta, initialRegion.longitudeDelta));

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        onRegionChangeComplete={({ latitudeDelta, longitudeDelta }) => (
          setRadiusFactor(calcRadiusFactor(latitudeDelta, longitudeDelta))
        )}
      >
        {filterAvailableStations.map(station => (
          <Fragment key={station.id}>
            <Marker
              coordinate={{ longitude: station.long, latitude: station.lat }}
            >
              <Callout onPress={() => onStationItemPress(station)}>
                <StationItem
                  station={station}
                />
              </Callout>
            </Marker>
            <Circle
              center={{ longitude: station.long, latitude: station.lat }}
              radius={radiusFactor * 1}
            />
          </Fragment>
        ))}
      </MapView>
    );
  }
}

MapViewResults.navigationOptions = {
  title: 'Map'
}