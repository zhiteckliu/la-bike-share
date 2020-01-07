import React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../styles/global';
import { services } from '../constants';

export default function StationListSummary({ serviceType, regionName, total, query }) {
  if (total > 0) {
    let subSummaryText = null;

    if (serviceType === services.RENT) {
      subSummaryText = (
        Object.keys(query).map(type => {
          const bikeTypeCount = query[type];
          if (bikeTypeCount > 0) return (
            <Text key={type}>
              - min. of {bikeTypeCount} <Text style={globalStyles.summaryHighlight}>{type}</Text> bike
                </Text>
          )
        })
      )
    } else {
      const { numBikesReturn } = query
      subSummaryText = (
        <Text>- min. of {numBikesReturn} <Text style={globalStyles.summaryHighlight}>vacant</Text> docks</Text>
      )
    }

    const stationPlural = total === 1 ? 'station' : 'stations';
    return (
      <View style={globalStyles.summaryBlock}>
        <View style={globalStyles.summaryText}>
          <Text>{total} {stationPlural} fulfils your request of:</Text>
          <Text style={globalStyles.summaryHighlight}>- {regionName}</Text>
          {subSummaryText}
        </View>
      </View>
    )
  }
  return null;
}