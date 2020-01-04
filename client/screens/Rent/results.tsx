import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import CentreText from '../../components/CentreText';
import { FilterAvailableStationQuery, FindEmptyDocksQuery } from '../../query/GetBikeShareStationsQuery';
import globalStyles from '../../styles/global';
import StationItem from '../../components/StationItem';
import MapViewResults from '../resultMap';
import StationListSummary from '../../components/StationListSummary';
import { services, pageSize } from '../../constants';

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
      smart,
      first: pageSize,
      offset: 0
    },
    notifyOnNetworkStatusChange: true
  })
  console.log(loading)
  if (loading && !data) return (
    <CentreText text="Loading ..." />
  );
  else {
    const { filterAvailableStations } = data;
    const { total, stations } = filterAvailableStations;
    console.log(total)
    console.log(stations.length)
    if (total === 0) return (
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
          data={stations}
          renderItem={({ item }) => (
            <StationItem station={item} />
          )}
          ListHeaderComponent={
            <StationListSummary
              serviceType={services.RENT}
              regionName={regionName}
              total={total}
              query={bikesQuery}
            />
          }
          ListFooterComponent={() => {
            return (total > stations.length &&
              <Button
                title={loading ? "loading..." : "view more"}
                disabled={loading}
                onPress={() => fetchMore(
                  {
                    variables: { offset: stations.length },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        filterAvailableStations: {
                          __typename: prev.filterAvailableStations.__typename,
                          stations: [...prev.filterAvailableStations.stations, ...fetchMoreResult.filterAvailableStations.stations],
                          total: fetchMoreResult.filterAvailableStations.total
                        }
                      });
                    }
                  }
                )}
              />)
          }
          }
          keyExtractor={item => item.id}
        />}
        {!isListMode && <MapViewResults stations={stations} />}
      </View>
    );
  }

}