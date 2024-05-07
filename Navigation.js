import React  from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";

//Screens
import HomeScreen from "./screens/homeScreen";
import SettingScreen from "./screens/SettingScreen";
import StackScreen from "./screens/StackScreen";
import homeScreen from "./screens/homeScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name = "Home" component = {homeScreen} /> 
            <Tab.Screen name = "Settngs" component = {SettingScreen} />
            <Tab.Screen name = "Home" component = {homeScreen} />  
        </Tab.Navigator>
    );
}

export default function Navigation () {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}