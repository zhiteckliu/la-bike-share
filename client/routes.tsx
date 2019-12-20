import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './screens/home';
import rentForm from './screens/rentForm';
import returnForm from './screens/returnForm';
import rentResults from './screens/rentResults';
import returnResults from './screens/returnResults';

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
  ReturnForm: {
    screen: returnForm,
    navigationOptions: {
      title: 'Returning options',
    }
  },
  RentResults: {
    screen: rentResults,
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
};

const ScreenStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 }
  }
});

export default createAppContainer(ScreenStack);


