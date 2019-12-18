import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './screens/home';
import FilterForm from './screens/filterForm';
import StationResults from './screens/filterForm';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Welcome to Bike Share',
    }
  },
  FilterForm: {
    screen: FilterForm,
    navigationOptions: {
      title: 'Review Details',
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


