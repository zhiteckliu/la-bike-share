import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import StationItem from '../components/StationItem';

import GetBikeShareStationsQuery from '../query/GetBikeShareStationsQuery';

export default function stationResults({ navigation }) {
  const region = navigation.getParam('region');
  const classic = parseInt(navigation.getParam('classic', '0'));
  const electric = parseInt(navigation.getParam('electric', '0'));
  const smart = parseInt(navigation.getParam('smart', '0'));

  console.log(`${region}, ${classic}, ${electric}, ${smart}`)
  const { loading, error, data } = useQuery(GetBikeShareStationsQuery, {
    variables: { region, classic, electric, smart }
  });

  if (loading) return (
    <View>
      <Text>Loading....</Text>
    </View>
  )
  console.log(data)
  const { filterAvailableStations } = data
  if (filterAvailableStations) {
    return (
      <>
        <View>
          <Text>{`${filterAvailableStations.length} stations fulfils your request of min. of ${classic}, ${electric}, ${smart}`}</Text>
        </View>
        <View style={styles.container}>
          <FlatList
            data={filterAvailableStations}
            renderItem={({ item }) => (
              <StationItem item={item} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
