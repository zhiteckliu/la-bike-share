import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import StationItem from '../components/StationItem';

import { FindEmptyDocksQuery } from '../query/GetBikeShareStationsQuery';

const summaryText = (region, total, bikesToReturn) => {
  if (total > 0) {
    const stationPlural = total === 1 ? 'station' : 'stations';
    return (
      <View style={styles.summaryBlock}>
        <View style={styles.summaryText}>
          <Text>{total} {stationPlural} fulfils your request of:</Text>
          <Text style={styles.summaryHighlight}>- {region}</Text>
          <Text>- min. of {bikesToReturn} <Text style={styles.summaryHighlight}>vacant</Text> docks</Text>
        </View>
      </View>
    )
  }
}

export default function stationResults({ navigation }) {
  const region = navigation.getParam('region');
  const regionName = navigation.getParam('regionName')
  const bikesToReturn = parseInt(navigation.getParam('total', '0'));

  console.log(`${region}, ${bikesToReturn}`)
  const { loading, error, data } = useQuery(FindEmptyDocksQuery, {
    variables: { region, total: bikesToReturn }
  });

  if (loading) return (
    <View style={styles.loading}>
      <Text style={styles.loadingText}>Loading....</Text>
    </View>
  )
  console.log(data)
  const { findEmptyDocks } = data
  if (findEmptyDocks) {
    return (
      <View style={styles.container}>
        <FlatList
          data={findEmptyDocks}
          renderItem={({ item }) => (
            <StationItem item={item} />
          )}
          ListHeaderComponent={summaryText(regionName, findEmptyDocks.length, bikesToReturn)}
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
