import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'

import globalStyles from '../styles/global';

export default function Home({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.intro}>
        Would you like to <Text style={globalStyles.introHighlight}>rent</Text> or <Text style={globalStyles.introHighlight}>return</Text> a bike?
      </Text>
      <View style={globalStyles.options}>
        <TouchableOpacity onPress={() => navigation.navigate('RentForm')}>
          <Text style={globalStyles.item}>Rent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ReturnForm')}>
          <Text style={globalStyles.item}>Return</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

