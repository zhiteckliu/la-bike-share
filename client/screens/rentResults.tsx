import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import StationItem from '../components/StationItem';
import { FilterAvailableStationQuery } from '../query/GetBikeShareStationsQuery';
import globalStyles from '../styles/global'

const summaryText = (region, bikesQuery, total) => {
  if (total > 0) {
    const stationPlural = total === 1 ? 'station' : 'stations';
    return (
      <View style={globalStyles.summaryBlock}>
        <View style={globalStyles.summaryText}>
          <Text>{total} {stationPlural} fulfils your request of:</Text>
          <Text style={globalStyles.summaryHighlight}>- {region}</Text>
          {
            Object.keys(bikesQuery).map(type => {
              const bikeTypeCount = bikesQuery[type];
              if (bikeTypeCount > 0) return (
                <Text key={type}>
                  - min. of {bikeTypeCount} <Text style={globalStyles.summaryHighlight}>{type}</Text> bike
                </Text>
              )
            })
          }
        </View>
      </View>
    )
  }
}

export default function stationResults({ navigation }) {
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

  if (loading) return (
    <View style={globalStyles.loading}>
      <Text style={globalStyles.loadingText}>Loading....</Text>
    </View>
  )

  const { filterAvailableStations } = data
  if (filterAvailableStations) {
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={filterAvailableStations}
          renderItem={({ item }) => (
            <StationItem item={item} />
          )}
          ListHeaderComponent={summaryText(regionName, bikesQuery, filterAvailableStations.length)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}