import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import CentreText from '../../components/CentreText';
import { FindEmptyDocksQuery } from '../../query/GetBikeShareStationsQuery';
import globalStyles from '../../styles/global';
import MapViewResults from '../../components/MapViewResults';
import { services, pageSize } from '../../constants';
import ListViewResults from '../../components/ListViewResults';
import LoadMoreButton from '../../components/LoadMoreButton';

export default function ReturnResults({ navigation }) {
  const [isListMode, setIsListMode] = useState(true);
  const region = navigation.getParam('region');
  const regionName = navigation.getParam('regionName')
  const numBikesReturn = +navigation.getParam('numBikesReturn');


  const { loading, data, fetchMore } = useQuery(
    FindEmptyDocksQuery, {
    variables: {
      region,
      numBikesReturn,
      first: pageSize
    },
    notifyOnNetworkStatusChange: true
  })

  const loadMoreStations = (currentDataLength) => (
    fetchMore({
      variables: { offset: currentDataLength },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          findEmptyDocks: {
            ...prev.findEmptyDocks,
            stations: [...prev.findEmptyDocks.stations, ...fetchMoreResult.findEmptyDocks.stations],
            total: fetchMoreResult.findEmptyDocks.total
          }
        }
      }
    }
    )
  )
  if (loading && !data) return (
    <CentreText text="Loading ..." />
  );
  else {
    const {
      findEmptyDocks: {
        total,
        stations
      }
    } = data;

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
            type={services.RETURN}
            regionName={regionName}
            stations={stations}
            total={total}
            query={{ numBikesReturn }}
            loading={loading}
            loadMoreStations={() => loadMoreStations(stations.length)}
          />
        }
        {!isListMode &&
          <>
            <MapViewResults stations={stations} />
            <LoadMoreButton
              buttonText={loading ? "loading..." : "view more"}
              summaryText={`${stations.length} of ${total} stations shown`}
              handleSubmit={() => loadMoreStations(stations.length)}
              disabled={loading}
              isButtonVisible={total > stations.length}
            />
          </>
        }
      </View>
    );
  }

}