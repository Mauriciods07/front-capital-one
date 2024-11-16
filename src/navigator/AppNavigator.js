import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from '../screens/auth/MainScreen';
import RegisterPage from '../screens/auth/RegisterPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../screens/auth/LoginPage';

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
          name = "RegisterPage"
          component = { RegisterPage }
        />
        <Stack.Screen
          name = "LoginPage"
          component={ LoginPage }
        />
      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default AppNavigator;