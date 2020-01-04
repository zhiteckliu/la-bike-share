import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';

import Home from './screens/home';
import rentForm from './screens/Rent/filterForm';
import rentResultsLoading from './screens/Rent/resultLoading'
import rentResultsList from './screens/Rent/resultList';
import ResultsMap from './screens/resultMap';
import returnForm from './screens/Return/filterForm';
import returnResultsLoading from './screens/Return/resultLoading'
import returnResultsList from './screens/Return/resultList';
import stationResultsv2 from './screens/Rent/results';

const ReturnResultsTabNavigator = createBottomTabNavigator(
  {
    returnResultsList,
    ResultsMap,
  }
)

const ReturnResultSwitchNavigator = createSwitchNavigator(
  {
    Loading: { screen: returnResultsLoading },
    ReturnResultsTab: ReturnResultsTabNavigator
  }
)

const RentResultsTabNavigator = createBottomTabNavigator(
  {
    rentResultsList,
    ResultsMap
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
      screen: stationResultsv2,
      navigationOptions: {
        title: 'Rent Results',
      }
    },
    ReturnResults: {
      screen: ReturnResultSwitchNavigator,
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


