import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { FilterAvailableStationQuery } from '../../query/GetBikeShareStationsQuery';
import CentreText from '../../components/CentreText';

export default function stationResults({ navigation }) {
  const [text, setText] = useState('Loading...');
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
      if (data.filterAvailableStations && data.filterAvailableStations.length > 0) {
        navigation.navigate('RentResultsTab', { ...data, datakey: 'filterAvailableStations' });
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