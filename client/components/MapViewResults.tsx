import React, { Fragment, useState, useEffect, useContext } from 'react';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

import StationItem from './StationItem'
import {
  getRegionForCoordinates,
  LongLat,
  onStationItemPress,
  calcRadiusFactor
} from '../utility'
import CentreText from './CentreText';


export default function MapViewResults({ stations }) {
  const [state, setState] = useState({
    radiusFactor: 0,
    region: null,
    maxAvailability: 0,
    initialLoadComplete: false
  })

  useEffect(() => {
    if (stations.length > 0) {
      let maxAvail = 0;
      let stationPoints: LongLat[] = [];

      stations.forEach((station) => {
        const stationAvailability = station.availability.total;
        stationPoints.push({ long: station.long, lat: station.lat });
        maxAvail = stationAvailability > maxAvail ? stationAvailability : maxAvail;
      })

      const region = getRegionForCoordinates(stationPoints);
      if (this.mapView) {
        this.mapView.animateToRegion(region, 1000)
      }
      setState({
        region,
        radiusFactor: calcRadiusFactor(region.latitudeDelta, region.longitudeDelta),
        maxAvailability: maxAvail,
        initialLoadComplete: true
      })
    }
  }, [stations])


  const { initialLoadComplete, radiusFactor, region, maxAvailability } = state
  if (!initialLoadComplete) return (
    <CentreText text="Loading map..." />
  );
  else {
    return (
      <MapView
        ref={map => this.mapView = map}
        style={{ flex: 1 }}
        initialRegion={region}
        onRegionChangeComplete={({ latitudeDelta, longitudeDelta }) => {
          setState(state => ({ ...state, radiusFactor: calcRadiusFactor(latitudeDelta, longitudeDelta) }))
        }}
      >
        {initialLoadComplete && stations.map(station => (
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
            </Circle>
          </Fragment>
        ))}
      </MapView>
    );
  }
}

MapViewResults.navigationOptions = {
  title: 'Map',
  tabBarIcon: () => (
    <Ionicons name="md-map" size={24} color="gray" />
  )
}