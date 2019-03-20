import React, { Component } from 'react'
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    Button
} from 'react-native'

import { createStackNavigator, createAppContainer,StackActions, NavigationActions  } from "react-navigation";

export default class DetailsScreen extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            msg: "DetailsScreen"
        }
    }

    static navigationOptions = ({navigation})=>({
        title: `${navigation.state.params.name}`,
        headerTitleStyle: {
            alignSelf: 'center',
            flex:1, 
            textAlign: 'center' 
        },
        headerRight: <View />
    });
    
    _onPress = () => {
        this.props.navigation.navigate('Home')
    }
    render () {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.body}>
                <Text>DetailsScreen</Text>
                {/* <Button onPress={this._onPress} title="Go to Home" /> */}
                <Button onPress={() => navigate('Home')} title="Go to Home" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'red'
    }
})