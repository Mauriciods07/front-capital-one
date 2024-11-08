import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from '../screens/MainScreen';
import SecondPage from '../screens/SecondPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
      >
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

export default AppNavigator;