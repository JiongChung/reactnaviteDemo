import React, {Component} from "react";
import { createStackNavigator } from "react-navigation";
import HomeScreen from '../components/Home/HomeScreen';
import ProfileScreen from '../components/Home/ProfileScreen';

const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Profile: {
        screen: ProfileScreen
    }
});


export default RootStack;