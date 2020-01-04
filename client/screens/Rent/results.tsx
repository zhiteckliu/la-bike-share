import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import CentreText from '../../components/CentreText';
import { FilterAvailableStationQuery } from '../../query/GetBikeShareStationsQuery';
import globalStyles from '../../styles/global';
import MapViewResults from '../../components/MapViewResults';
import { services, pageSize } from '../../constants';
import ListViewResults from '../../components/ListViewResults';

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

  const loadMoreStations = (currentDataLength) => fetchMore(
    {
      variables: { offset: currentDataLength },
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
  )

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
        {isListMode &&
          <ListViewResults
            type={services.RENT}
            regionName={regionName}
            stations={stations}
            total={total}
            query={bikesQuery}
            loading={loading}
            loadMoreStations={loadMoreStations}
          />
        }
        {!isListMode &&
          <>
            <MapViewResults stations={stations} />
            <Button
              title={loading ? "loading..." : "view more"}
              disabled={loading}
              onPress={() => loadMoreStations(stations.length)}
            />
          </>
        }
      </View>
    );
  }

}