import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import StationItem from '../../components/StationItem';
import globalStyles from '../../styles/global'
import { StationContext } from '../../contexts/StationContext';
import StationListSummary from '../../components/StationListSummary';
import { services } from '../../constants';

export default function stationResults({ navigation }) {
  const { stations } = useContext(StationContext);
  const regionName = navigation.getParam('regionName')
  const bikesToReturn = navigation.getParam('total')
  if (stations) {
    return (
      <View style={globalStyles.container}>
        <FlatList
          data={stations}
          renderItem={({ item }) => (
            <StationItem station={item} />
          )}
          ListHeaderComponent={
            <StationListSummary
              serviceType={services.RETURN}
              regionName={regionName}
              total={stations.length}
              query={{ bikesToReturn }}
            />
          }
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