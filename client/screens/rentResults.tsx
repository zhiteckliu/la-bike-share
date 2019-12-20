import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import StationItem from '../components/StationItem';

import { FilterAvailableStationQuery } from '../query/GetBikeShareStationsQuery';

const summaryText = (region, bikesQuery, total) => {
  if (total > 0) {
    const stationPlural = total === 1 ? 'station' : 'stations';
    return (
      <View style={styles.summaryBlock}>
        <View style={styles.summaryText}>
          <Text>{total} {stationPlural} fulfils your request of:</Text>
          <Text style={styles.summaryHighlight}>- {region}</Text>
          {
            Object.keys(bikesQuery).map(type => {
              const bikeTypeCount = bikesQuery[type];
              if (bikeTypeCount > 0) return (
                <Text key={type}>
                  - min. of {bikeTypeCount} <Text style={styles.summaryHighlight}>{type}</Text> bike
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
  const region = navigation.getParam('region');
  const regionName = navigation.getParam('regionName')
  // const classic = parseInt(navigation.getParam('classic', '0'));
  // const electric = parseInt(navigation.getParam('electric', '0'));
  // const smart = parseInt(navigation.getParam('smart', '0'));

  const bikesQuery = {
    classic: parseInt(navigation.getParam('classic', '0')),
    electric: parseInt(navigation.getParam('electric', '0')),
    smart: parseInt(navigation.getParam('smart', '0')),
  }

  const { classic, electric, smart } = bikesQuery;

  console.log(`${region}, ${classic}, ${electric}, ${smart}`)
  const { loading, error, data } = useQuery(FilterAvailableStationQuery, {
    variables: { region, classic, electric, smart }
  });

  if (loading) return (
    <View style={styles.loading}>
      <Text style={styles.loadingText}>Loading....</Text>
    </View>
  )
  console.log(data)
  const { filterAvailableStations } = data
  if (filterAvailableStations) {
    return (
      <View style={styles.container}>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    textAlign: 'center'
  },
  summaryBlock: {
    alignItems: 'center'
  },
  summaryText: {
    width: 230
  },
  summaryHighlight: {
    fontWeight: '600'
  }
});
