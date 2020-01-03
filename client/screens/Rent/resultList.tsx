import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import StationItem from '../../components/StationItem';
import globalStyles from '../../styles/global'
import { StationContext } from '../../contexts/StationContext';

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
  const { stations } = useContext(StationContext);
  const regionName = navigation.getParam('regionName')

  const bikesQuery = {
    classic: parseInt(navigation.getParam('classic', '0')),
    electric: parseInt(navigation.getParam('electric', '0')),
    smart: parseInt(navigation.getParam('smart', '0')),
  }

  if (stations) {
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={stations}
          renderItem={({ item }) => (
            <StationItem station={item} />
          )}
          ListHeaderComponent={summaryText(regionName, bikesQuery, stations.length)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

stationResults.navigationOptions = {
  title: 'List',
  tabBarIcon: () => (
    <Ionicons name="ios-list" size={24} color="gray" />
  )
}