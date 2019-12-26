import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import globalStyles from '../styles/global';

export default function StationItem({ station }) {
  const { name, address, availability } = station;
  const { emptyDocks, total, type } = availability;
  const { classic, electric, smart } = type;
  const pinIcon = require('../assets/pin.png')
  return (
    <TouchableOpacity>
      <View style={globalStyles.item}>
        <View style={globalStyles.overview}>
          <View style={globalStyles.overviewSection}>
            <Text style={globalStyles.name}>{name}</Text>
            <View style={globalStyles.address}>
              <Image
                source={pinIcon}
                style={globalStyles.addressIcon} />
              <Text style={globalStyles.addressText}>{address}</Text>
            </View>
          </View>
          <View style={globalStyles.totalSection}>
            <View style={globalStyles.totalAvail}>
              <Text style={globalStyles.totalAvailTitle}>Total Bikes Available</Text>
              <View style={globalStyles.totalAvailCount}>
                <Text style={globalStyles.totalAvailCountNum}>{total}</Text>
              </View>
            </View>
            <View style={globalStyles.totalAvail}>
              <Text style={globalStyles.totalAvailTitle}>Vacant Docks</Text>
              <View style={globalStyles.totalAvailCount}>
                <Text style={globalStyles.totalAvailCountNum}>{emptyDocks}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={globalStyles.breakdown}>
          <Text style={globalStyles.breakdownTitle}>Available Bikes Breakdown</Text>
          <View style={globalStyles.breakdownSection}>
            <View style={globalStyles.breakdownCategory}>
              <Text style={globalStyles.breakdownTitle}>Classic</Text>
              <Text style={globalStyles.breakdownCount}>{classic}</Text>
            </View>
            <View style={globalStyles.breakdownCategory}>
              <Text style={globalStyles.breakdownTitle}>Electric</Text>
              <Text style={globalStyles.breakdownCount}>{electric}</Text>
            </View>
            <View style={globalStyles.breakdownCategory}>
              <Text style={globalStyles.breakdownTitle}>Smart</Text>
              <Text style={globalStyles.breakdownCount}>{smart}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity >
  );
}
