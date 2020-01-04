import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { Ionicons } from '@expo/vector-icons';

import CentreText from '../../components/CentreText';
import { FilterAvailableStationQuery, FindEmptyDocksQuery } from '../../query/GetBikeShareStationsQuery';
import globalStyles from '../../styles/global';
import StationItem from '../../components/StationItem';
import MapViewResults from '../resultMap';
import StationListSummary from '../../components/StationListSummary';
import { services } from '../../utility';
import { serviceType } from '../../utility/index';

export default function stationResultsv2({ navigation }) {
  const [isListMode, setIsListMode] = useState(true);
  const region = navigation.getParam('region');
  const regionName = navigation.getParam('regionName');

  const bikesQuery = {
    classic: parseInt(navigation.getParam('classic', '0')),
    electric: parseInt(navigation.getParam('electric', '0')),
    smart: parseInt(navigation.getParam('smart', '0')),
  }

  const { classic, electric, smart } = bikesQuery;

  const { loading, data, fetchMore } = useQuery(
    FilterAvailableStationQuery, {
    variables: {
      region,
      classic,
      electric,
      smart
    }
  })

  if (loading) return (
    <CentreText text="Loading ..." />
  );
  else {
    const { filterAvailableStations } = data;
    if (filterAvailableStations.length === 0) return (
      <CentreText text="No results matched your query. Please try again." />
    );

    return (
      <View style={globalStyles.container}>
        <Button
          title={isListMode ? "View results in map" : "View results in list"}
          onPress={() => {
            setIsListMode(!isListMode);
          }}
        />
        {isListMode && <FlatList
          data={filterAvailableStations}
          renderItem={({ item }) => (
            <StationItem station={item} />
          )}
          ListHeaderComponent={
            <StationListSummary
              serviceType={services.RENT}
              regionName={regionName}
              total={filterAvailableStations.length}
              query={bikesQuery}
            />
          }
          keyExtractor={item => item.id}
        />}
        {!isListMode && <MapViewResults stations={filterAvailableStations} />}
      </View>
    );
  }

}