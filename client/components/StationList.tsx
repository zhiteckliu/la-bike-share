import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import StationItem from './StationItem';



export default function StationList({ loading, data }) {
  if (loading) return (
    <View>
      <Text>Loading....</Text>
    </View>
  )

  return (
    <FlatList
      data={data.bikeShareStations}
      renderItem={({ item }) => (
        <StationItem item={item} />
      )}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({

});
