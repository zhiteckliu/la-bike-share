import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useQuery } from '@apollo/react-hooks'

import GetBikeShareStationsQuery from '../query/GetBikeShareStationsQuery';
import StationList from '../components/StationList'
import Header from '../components/Header'

export default function BikeShareContainer() {
  const { loading, error, data } = useQuery(GetBikeShareStationsQuery);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <StationList
          loading={loading}
          data={data}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 24
  },
});
