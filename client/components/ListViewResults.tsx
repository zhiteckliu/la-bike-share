import React from 'react';
import { FlatList } from 'react-native';
import StationItem from './StationItem';
import StationListSummary from './StationListSummary';
import LoadMoreButton from './LoadMoreButton';


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
          <LoadMoreButton
            buttonText={loading ? "loading..." : "view more"}
            summaryText={`${stations.length} of ${total} stations shown`}
            handleSubmit={() => loadMoreStations(stations.length)}
            disabled={loading}
            isButtonVisible={total > stations.length}
          />
        )
      }
      }
      keyExtractor={item => item.id}
    />
  )
}