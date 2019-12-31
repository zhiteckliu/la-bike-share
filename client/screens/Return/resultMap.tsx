import React, { Fragment, useState } from 'react';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';

import { getRegionForCoordinates, LongLat } from '../../utility'
import StationItem from '../../components/StationItem'
import { onStationItemPress, calcRadiusFactor } from '../../utility'


export default function MapViewResults({ navigation }) {
  const findEmptyDocks = navigation.dangerouslyGetParent().getParam('findEmptyDocks');
  console.log(findEmptyDocks)
  if (findEmptyDocks) {
    let maxAvailability = 0;
    let stationPoints: LongLat[] = [];

    findEmptyDocks.forEach((station) => {
      const stationAvailability = station.availability.emptyDocks;
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
        {findEmptyDocks.map(station => (
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
              radius={radiusFactor * station.availability.emptyDocks / maxAvailability}
              strokeColor='#0080ff'
              fillColor='rgba(0,128,255, 0.2)'
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