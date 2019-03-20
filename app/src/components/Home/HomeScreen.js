import React, { Component } from 'react'
import { Text, StyleSheet, View, Button ,Navigator} from 'react-native'
import { createStackNavigator,NavigationNavigator,createAppContainer} from 'react-navigation';
import MenuScreen from '../../../../modules/Menu';



export default class HomeScreen extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = {
        title: 'Home'
    }

    _onPress = () => {
        navigator.push(<MenuScreen />)
    }
    render() {
        return (
        <View>
            <Text> one </Text>
            <Button title="go to two" onPress={this._onPress} />
        </View>
        )
    }
}

const styles = StyleSheet.create({})