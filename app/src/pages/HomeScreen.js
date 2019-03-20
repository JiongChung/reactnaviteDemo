import React, { Component } from 'react'
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    Button
} from 'react-native'

// import { createStackNavigator, createAppContainer,StackActions, NavigationActions  } from "react-navigation";
import Ionicons from 'react-native-vector-icons/FontAwesome';
import IconFont from '../components/Fonts/IconFont';
import AliIcon from '../assets/AliIcon';
import ProfileScreen from './ProfileScreen';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            msg: ''
        }
    }
    _onPress = () => {
        alert(JSON.stringify(this.props))
        this.setState({
            msg: 'Go to DetailsGo to DetailsGo to DetailsGo to Details'
        })
        this.props.navigation.navigate('Details',{name: this.state.msg});
        
    }
    componentDidMount(){
        this.setState({
            msg: 'Go to DetailsGo to Details'
        })
    }
    render () {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>HomeScreen</Text>
                <Text>ddd</Text>
                <Button onPress={this._onPress} title="Go to Details" />
                {/* <Button onPress={() => navigate('Details',{name: this.state.msg})} title="Go to Details" /> */}
                <IconFont
                    font="&#xe60d;"
                    style={{fontSize: 26, color: 'blue' }}
                    onPress={() => alert("home") } 
                />
                <Ionicons name="home" size={50} color='blue'></Ionicons>
                <AliIcon name="gaixie" size={50} color='blue' />
                <ProfileScreen navigation={this.props.navigation} />
            </View>
        )
    }
}