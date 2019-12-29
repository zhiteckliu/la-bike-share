import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import { FilterAvailableStationQuery } from '../../query/GetBikeShareStationsQuery';
import globalStyles from '../../styles/global'

export default function stationResults({ navigation }) {
  const region = navigation.getParam('region');
  const regionName = navigation.getParam('regionName')

  const bikesQuery = {
    classic: parseInt(navigation.getParam('classic', '0')),
    electric: parseInt(navigation.getParam('electric', '0')),
    smart: parseInt(navigation.getParam('smart', '0')),
  }

  const { classic, electric, smart } = bikesQuery;

  const { loading, error, data } = useQuery(FilterAvailableStationQuery, {
    variables: { region, classic, electric, smart }
  });

  useEffect(() => {
    if (!loading) {
      navigation.navigate('RentResultsTab', data);
    }
  })
  return (
    <View style={globalStyles.loading}>
      <Text style={globalStyles.loadingText}>Loading....</Text>
    </View>
  )

}