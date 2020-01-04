import React from 'react';
import { FlatList, Button } from 'react-native';
import StationItem from './StationItem';
import StationListSummary from './StationListSummary';


export default function ListViewResults({
  type,
  regionName,
  stations,
  total,
  query,
  loading,
  loadMoreStations
}) {
  return (
    <FlatList
      data={stations}
      renderItem={({ item }) => (<StationItem station={item} />)}
      ListHeaderComponent={
        <StationListSummary
          serviceType={type}
          regionName={regionName}
          total={total}
          query={query}
        />
      }
      ListFooterComponent={() => {
        return (total > stations.length &&
          <Button
            title={loading ? "loading..." : "view more"}
            disabled={loading}
            onPress={() => loadMoreStations(stations.length)}
          />)
      }
      }
      keyExtractor={item => item.id}
    />
  )
}