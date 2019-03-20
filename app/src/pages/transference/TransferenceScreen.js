import React, { Component } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text
} from 'react-native';

import { createStackNavigator, createAppContainer,StackActions, NavigationActions  } from "react-navigation";

export default class TransferenceScreen extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <View>
                <Text>TransferenceScreen page</Text>
            </View>
        )
    }
}