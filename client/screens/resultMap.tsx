import React, { Fragment, useState } from 'react';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';

import StationItem from '../components/StationItem'
import {
  getRegionForCoordinates,
  LongLat,
  onStationItemPress,
  calcRadiusFactor
} from '../utility'


export default function MapViewResults({ navigation }) {
  const datakey = navigation.dangerouslyGetParent().getParam('datakey');
  const stations = navigation.dangerouslyGetParent().getParam(datakey);
  if (stations) {
    let maxAvailability = 0;
    let stationPoints: LongLat[] = [];

    stations.forEach((station) => {
      const stationAvailability = station.availability.total;
      stationPoints.push({ long: station.long, lat: station.lat });
      maxAvailability = stationAvailability > maxAvailability ? stationAvailability : maxAvailability;
    })

    const initialRegion = getRegionForCoordinates(stationPoints);
    const [radiusFactor, setRadiusFactor] = useState(calcRadiusFactor(initialRegion.latitudeDelta, initialRegion.longitudeDelta));

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        onRegionChangeComplete={({ latitudeDelta, longitudeDelta }) => (
          setRadiusFactor(calcRadiusFactor(latitudeDelta, longitudeDelta))
        )}
      >
        {stations.map(station => (
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
              radius={radiusFactor * station.availability.total / maxAvailability}
              strokeColor='#0080ff'
              fillColor='rgba(0,128,255, 0.2)'
            >
              <Callout onPress={() => onStationItemPress(station)}>
                <StationItem
                  station={station}
                />
              </Callout>
            </Circle>
          </Fragment>
        ))}
      </MapView>
    );
  }
}

MapViewResults.navigationOptions = {
  title: 'Map'
}