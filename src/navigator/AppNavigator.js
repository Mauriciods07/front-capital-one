import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from '../screens/auth/MainScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InitPage from '../screens/InitPage';
import LoginPage from '../screens/auth/LoginPage';
import RegisterPage from '../screens/auth/RegisterPage';
import EditProfile from '../screens/tabNavigation/EditProfile';
import TabBarNavigation from '../navigator/TabBarNavigation'
import { KeysNav } from './NavigationKeys';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    function AuthNavigation() {
      return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName={ KeysNav.MainScreen }
      >
        <Stack.Screen
          name = { KeysNav.MainScreen }
          component = { MainScreen }
        />
        <Stack.Screen
          name = { KeysNav.RegisterPage }
          component = { RegisterPage }
        />
        <Stack.Screen
          name = { KeysNav.LoginPage }
          component={ LoginPage }
        />
      </Stack.Navigator>
      )
    }

    return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName={ KeysNav.InitPage }
      >
        <Stack.Screen
          name = { KeysNav.InitPage }
          component = { InitPage }
        />
        <Stack.Screen
          name = { KeysNav.AuthRoute }
          component = { AuthNavigation }
        />
        <Stack.Screen
          name = { KeysNav.TabBar }
          component = { TabBarNavigation }
        />
        <Stack.Screen
          name = { KeysNav.EditProfile }
          component = { EditProfile }
        />
      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default AppNavigator;