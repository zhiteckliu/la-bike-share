import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './screens/home';
import rentForm from './screens/rentForm';
import StationResults from './screens/stationResults';

const screens = {
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
  ReturningForm: {
    screen: rentForm,
    navigationOptions: {
      title: 'Returning options',
    }
  },
  StationResults: {
    screen: StationResults,
    navigationOptions: {
      title: 'Results',
    }
  }
};

const ScreenStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 }
  }
});

export default createAppContainer(ScreenStack);


