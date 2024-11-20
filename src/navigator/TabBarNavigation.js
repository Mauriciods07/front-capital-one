import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";

import { KeysNav, TabNavigation } from "./NavigationKeys";
import { colors } from "../configuration/colors";
import Calendar from "../screens/tabNavigation/CalendarPage";
import Chat from '../screens/tabNavigation/Chat';
import Feed from '../screens/tabNavigation/Feed';
import Profile from '../screens/tabNavigation/Profile';
import Ranking from '../screens/tabNavigation/Ranking';

const Tab = createBottomTabNavigator();

const TabBarNavigation = ({navigation}) => {
    return (
        <Tab.Navigator
            initialRouteName = {TabNavigation.Profile}
            
            screenOptions={{
              tabBarActiveTintColor: colors.white,
              tabBarActiveBackgroundColor: colors.highlights,
              tabBarInactiveBackgroundColor: colors.main,
              headerShown: false
            }}
        >
            <Tab.Screen
                name = { TabNavigation.Calendar }
                component={Calendar}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name='home' size={40} color={colors.white} />);
                    }
                }}
            />
            <Tab.Screen
                name = { TabNavigation.Feed }
                component={Feed}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name='feed' size={40} color={colors.white} />);
                    }
                }}
            />
            <Tab.Screen
                name = { TabNavigation.Ranking }
                component={Ranking}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name='star' size={40} color={colors.white} />);
                    }
                }}
            />
            <Tab.Screen
                name = { TabNavigation.Chat }
                component={Chat}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name='wechat' size={40} color={colors.white} />);
                    }
                }}
            />
            <Tab.Screen
                name = { TabNavigation.Profile }
                component={Profile}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name='user' size={40} color={colors.white} />);
                    }
                }}
            />
        </Tab.Navigator>
    );
}

const localStyles = StyleSheet.create({
    root: {

    }
});

export default TabBarNavigation;