import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../components/Header'

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.intro}>
        Would you like to <Text style={styles.introHighlight}>rent</Text> or <Text style={styles.introHighlight}>return</Text> a bike?
      </Text>
      <View style={styles.options}>
        <TouchableOpacity onPress={() => navigation.navigate('RentForm')}>
          <Text style={styles.item}>Rent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ReturnForm')}>
          <Text style={styles.item}>Return</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,

  },
  intro: {
    flex: 4,
    textAlign: 'center',
    fontSize: 30,
  },
  introHighlight: {
    fontWeight: '600'
  },
  options: {
    flex: 6,
    justifyContent: 'flex-end',
    marginBottom: 50
  },
  item: {
    padding: 16,
    textAlign: 'center',
    marginTop: 16,
    borderColor: '#333',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10
  },
});
