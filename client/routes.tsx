import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from './screens/home';
import rentForm from './screens/rentForm';
import returnForm from './screens/returnForm';
import rentResults from './screens/rentResults';
import rentResultsLoading from './screens/rentResultsLoading'
import returnResults from './screens/returnResults';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const testMapView = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Map View</Text>
  </View>
);

const RentResultsTabNavigator = createMaterialTopTabNavigator(
  {
    rentResults,
    testMapView
  },
  {
    swipeEnabled: false,
  }
)

const RentResultSwitchNavigator = createSwitchNavigator(
  {
    Loading: { screen: rentResultsLoading },
    RentResultsTab: RentResultsTabNavigator
  }
)

const ScreenStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Welcome to Bike Share',
      }
    },
    RentForm: {
      screen: rentForm,
      navigationOptions: {
        title: 'Renting options',
      }
    },
    ReturnForm: {
      screen: returnForm,
      navigationOptions: {
        title: 'Returning options',
      }
    },
    RentResults: {
      screen: RentResultSwitchNavigator,
      navigationOptions: {
        title: 'Rent Results',
      }
    },
    ReturnResults: {
      screen: returnResults,
      navigationOptions: {
        title: 'Return Results',
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#444',
      headerStyle: { backgroundColor: '#eee', height: 60 }
    }
  });

export default createAppContainer(ScreenStack);


