import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
// import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './screens/Home';
const { Navigator, Screen } = createStackNavigator();

const Navigation = () => {
  const MainNavigator = () => (
    <Navigator headerMode="none">
      <Screen name="Home" component={HomeScreen} />
    </Navigator>
  );

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
