import React, { Fragment, useState, useEffect } from 'react';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';

import StationItem from '../components/StationItem'
import {
  getRegionForCoordinates,
  LongLat,
  onStationItemPress,
  calcRadiusFactor
} from '../utility'


export default function MapViewResults({ navigation }) {
  const [state, setState] = useState({
    radiusFactor: 0,
    initialRegion: null,
    maxAvailability: 0,
  })

  const datakey = navigation.dangerouslyGetParent().getParam('datakey');
  const stations = navigation.dangerouslyGetParent().getParam(datakey);

  useEffect(() => {
    let maxAvail = 0;
    let stationPoints: LongLat[] = [];

    stations.forEach((station) => {
      const stationAvailability = station.availability.total;
      stationPoints.push({ long: station.long, lat: station.lat });
      maxAvail = stationAvailability > maxAvail ? stationAvailability : maxAvail;
    })

    const initRegion = getRegionForCoordinates(stationPoints);

    setState({
      initialRegion: initRegion,
      radiusFactor: calcRadiusFactor(initRegion.latitudeDelta, initRegion.longitudeDelta),
      maxAvailability: maxAvail
    })
  })


  const { radiusFactor, initialRegion, maxAvailability } = state

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={initialRegion}
      onRegionChangeComplete={({ latitudeDelta, longitudeDelta }) => (
        setState(state => ({ ...state, radiusFactor: calcRadiusFactor(latitudeDelta, longitudeDelta) }))
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

MapViewResults.navigationOptions = {
  title: 'Map'
}