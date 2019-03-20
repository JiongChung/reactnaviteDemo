import React,{ Component } from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, createAppContainer,StackActions, NavigationActions  } from "react-navigation";
import './Global.js';
import WelcomeScreen from './app/src/pages/WelcomScreen';

import {AppStackNavigator} from "./app/src/navigations/AppNavigators";
export default createAppContainer(AppStackNavigator);