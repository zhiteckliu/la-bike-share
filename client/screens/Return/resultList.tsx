import React from 'react';
import { View, Text, FlatList } from 'react-native';

import StationItem from '../../components/StationItem';
import globalStyles from '../../styles/global'

const summaryText = (region, total, bikesToReturn) => {
  if (total > 0) {
    const stationPlural = total === 1 ? 'station' : 'stations';
    return (
      <View style={globalStyles.summaryBlock}>
        <View style={globalStyles.summaryText}>
          <Text>{total} {stationPlural} fulfils your request of:</Text>
          <Text style={globalStyles.summaryHighlight}>- {region}</Text>
          <Text>- min. of {bikesToReturn} <Text style={globalStyles.summaryHighlight}>vacant</Text> docks</Text>
        </View>
      </View>
    )
  }
}

export default function stationResults({ navigation }) {
  const findEmptyDocks = navigation.dangerouslyGetParent().getParam('findEmptyDocks');
  const regionName = navigation.getParam('regionName')
  const bikesToReturn = navigation.getParam('total')
  if (findEmptyDocks) {
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={findEmptyDocks}
          renderItem={({ item }) => (
            <StationItem station={item} />
          )}
          ListHeaderComponent={summaryText(regionName, findEmptyDocks.length, bikesToReturn)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

stationResults.navigationOptions = {
  title: 'List'
}