import React, { useState, useEffect, useContext } from 'react';

import CentreText from '../../components/CentreText';
import { StationContext } from '../../contexts/StationContext';

export default function stationResults({ navigation }) {
  const [text, setText] = useState('Loading...');
  const region = navigation.getParam('region');

  const { fetchStations } = useContext(StationContext);

  const bikesQuery = {
    classic: parseInt(navigation.getParam('classic', '0')),
    electric: parseInt(navigation.getParam('electric', '0')),
    smart: parseInt(navigation.getParam('smart', '0')),
  }

  const { classic, electric, smart } = bikesQuery;

  useEffect(() => {
    fetchStations(region, classic, electric, smart).then(
      (stations) => {
        if (stations.length > 0) {
          navigation.navigate('RentResultsTab');
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