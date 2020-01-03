import React, { useState, useEffect, useContext } from 'react';

import CentreText from '../../components/CentreText';
import { StationContext } from '../../contexts/StationContext';

export default function stationResults({ navigation }) {
  const [text, setText] = useState('Loading...');
  const region = navigation.getParam('region');
  const bikesToReturn = parseInt(navigation.getParam('total', '0'));

  const { fetchDocks } = useContext(StationContext);

  useEffect(() => {
    fetchDocks(region, bikesToReturn).then(
      (stations) => {
        if (stations.length > 0) {
          navigation.navigate('ReturnResultsTab');
        }
        else {
          setText('No results matched your query. Please try again.');
        }
      }
    )
  }, [])

  return (
    <CentreText text={text} />
  )

}