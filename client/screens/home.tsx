import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'

import globalStyles from '../styles/global';
import { screenNames } from '../constants';

export default function Home({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.intro}>
        Would you like to <Text style={globalStyles.introHighlight}>rent</Text> or <Text style={globalStyles.introHighlight}>return</Text> a bike?
      </Text>
      <View style={globalStyles.options}>
        <TouchableOpacity onPress={() => navigation.navigate(screenNames.RENT_FORM)}>
          <Text style={globalStyles.item}>Rent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(screenNames.RETURN_FORM)}>
          <Text style={globalStyles.item}>Return</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

