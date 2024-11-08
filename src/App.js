import React from 'react';
import { View } from 'react-native';
import AppNavigator from './navigator/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import SecondPage from './screens/SecondPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "MainScreen"
          component = { MainScreen }
        />
        <Stack.Screen
          name = "SecondPage"
          component = { SecondPage }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
