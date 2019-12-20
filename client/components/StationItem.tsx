import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function StationItem({ item }) {
  const { name, address, availability } = item;
  const { emptyDocks, total, type } = availability;
  const { classic, electric, smart } = type;
  const pinIcon = require('../assets/pin.png')
  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <View style={styles.overview}>
          <View style={styles.overviewSection}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.address}>
              <Image
                source={pinIcon}
                style={styles.addressIcon} />
              <Text style={styles.addressText}>{address}</Text>
            </View>
          </View>
          <View style={styles.totalSection}>
            <View style={styles.totalAvail}>
              <Text style={styles.totalAvailTitle}>Total Bikes Available</Text>
              <View style={styles.totalAvailCount}>
                <Text style={styles.totalAvailCountNum}>{total}</Text>
              </View>
            </View>
            <View style={styles.totalAvail}>
              <Text style={styles.totalAvailTitle}>Vacant Docks</Text>
              <View style={styles.totalAvailCount}>
                <Text style={styles.totalAvailCountNum}>{emptyDocks}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.breakdown}>
          <Text style={styles.breakdownTitle}>Available Bikes Breakdown</Text>
          <View style={styles.breakdownSection}>
            <View style={styles.breakdownCategory}>
              <Text style={styles.breakdownTitle}>Classic</Text>
              <Text style={styles.breakdownCount}>{classic}</Text>
            </View>
            <View style={styles.breakdownCategory}>
              <Text style={styles.breakdownTitle}>Electric</Text>
              <Text style={styles.breakdownCount}>{electric}</Text>
            </View>
            <View style={styles.breakdownCategory}>
              <Text style={styles.breakdownTitle}>Smart</Text>
              <Text style={styles.breakdownCount}>{smart}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10
  },
  overview: {
    flex: 1,
    flexDirection: 'row',
  },
  overviewSection: {
    justifyContent: 'center',
    flex: 1
  },
  name: {
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  address: {
    flexDirection: 'row',
    marginTop: 10
  },
  addressText: {
    fontStyle: 'italic'
  },
  addressIcon: {
    height: 20,
    width: 20
  },
  totalSection: {
    flex: 1,
  },
  totalAvail: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 5,
  },
  totalAvailTitle: {
    width: 80,
    marginLeft: 8,
    fontWeight: '600'
  },
  totalAvailCount: {
    justifyContent: 'center',
  },
  totalAvailCountNum: {
    marginLeft: 8,
    lineHeight: 32,
    width: 32,
    textAlign: 'center',
    borderRadius: 32,
    color: 'white',
    backgroundColor: '#00A2FF',
    fontWeight: '600'
  },
  breakdown: {
    marginTop: 8,
  },
  breakdownTitle: {
    fontWeight: '800'
  },
  breakdownSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  breakdownCategory: {
    flexDirection: 'row'
  },
  breakdownCount: {
    marginLeft: 8
  }
});
