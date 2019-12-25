import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import StationItem from '../components/StationItem';
import { FilterAvailableStationQuery } from '../query/GetBikeShareStationsQuery';
import globalStyles from '../styles/global'

const summaryText = (region, bikesQuery, total) => {
  if (total > 0) {
    const stationPlural = total === 1 ? 'station' : 'stations';
    return (
      <View style={globalStyles.summaryBlock}>
        <View style={globalStyles.summaryText}>
          <Text>{total} {stationPlural} fulfils your request of:</Text>
          <Text style={globalStyles.summaryHighlight}>- {region}</Text>
          {
            Object.keys(bikesQuery).map(type => {
              const bikeTypeCount = bikesQuery[type];
              if (bikeTypeCount > 0) return (
                <Text key={type}>
                  - min. of {bikeTypeCount} <Text style={globalStyles.summaryHighlight}>{type}</Text> bike
                </Text>
              )
            })
          }
        </View>
      </View>
    )
  }
}

export default function stationResults({ navigation }) {
  const filterAvailableStations = navigation.dangerouslyGetParent().getParam('filterAvailableStations');
  const regionName = navigation.getParam('regionName')

  const bikesQuery = {
    classic: parseInt(navigation.getParam('classic', '0')),
    electric: parseInt(navigation.getParam('electric', '0')),
    smart: parseInt(navigation.getParam('smart', '0')),
  }

  if (filterAvailableStations) {
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={filterAvailableStations}
          renderItem={({ item }) => (
            <StationItem item={item} />
          )}
          ListHeaderComponent={summaryText(regionName, bikesQuery, filterAvailableStations.length)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}