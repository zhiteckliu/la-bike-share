import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import StationItem from '../components/StationItem';
import { FindEmptyDocksQuery } from '../query/GetBikeShareStationsQuery';
import globalStyles from '../styles/global'

const summaryText = (region, total, bikesToReturn) => {
  if (total > 0) {
    const stationPlural = total === 1 ? 'station' : 'stations';
    return (
      <View style={globalStyles.summaryBlock}>
        <View style={globalStyles.summaryText}>
          <Text>{total} {stationPlural} fulfils your request of:</Text>
          <Text style={globalStyles.summaryHighlight}>- {region}</Text>
          <Text>- min. of {bikesToReturn} <Text style={globalStyles.summaryHighlight}>vacant</Text> docks</Text>
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
    <View style={globalStyles.loading}>
      <Text style={globalStyles.loadingText}>Loading....</Text>
    </View>
  )
  console.log(data)
  const { findEmptyDocks } = data
  if (findEmptyDocks) {
    return (
      <View style={globalStyles.container}>
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