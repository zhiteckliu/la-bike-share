import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import { FindEmptyDocksQuery } from '../../query/GetBikeShareStationsQuery';
import globalStyles from '../../styles/global'

export default function stationResults({ navigation }) {
  const region = navigation.getParam('region');
  const regionName = navigation.getParam('regionName')
  const bikesToReturn = parseInt(navigation.getParam('total', '0'));

  const { loading, error, data } = useQuery(FindEmptyDocksQuery, {
    variables: { region, total: bikesToReturn }
  });

  useEffect(() => {
    if (!loading) {
      navigation.navigate('ReturnResultsTab', data);
    }
  })
  return (
    <View style={globalStyles.loading}>
      <Text style={globalStyles.loadingText}>Loading....</Text>
    </View>
  )

}