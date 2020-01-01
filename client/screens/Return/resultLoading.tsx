import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import { FindEmptyDocksQuery } from '../../query/GetBikeShareStationsQuery';
import globalStyles from '../../styles/global'
import CentreText from '../../components/CentreText';

export default function stationResults({ navigation }) {
  const [text, setText] = useState('Loading...');
  const region = navigation.getParam('region');
  const regionName = navigation.getParam('regionName')
  const bikesToReturn = parseInt(navigation.getParam('total', '0'));

  const { loading, error, data } = useQuery(FindEmptyDocksQuery, {
    variables: { region, total: bikesToReturn }
  });

  useEffect(() => {
    if (!loading) {
      if (data.findEmptyDocks && data.findEmptyDocks.length > 0) {
        navigation.navigate('ReturnResultsTab', { ...data, datakey: 'findEmptyDocks' });
      }
      else {
        setText('No results matched your query. Please try again.')
      }
    }
  })
  return (
    <CentreText text={text} />
  )

}