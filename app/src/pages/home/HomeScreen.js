import React, { Component } from 'react'
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text
} from 'react-native';
import { createStackNavigator, createAppContainer,StackActions, NavigationActions  } from "react-navigation";
import Ionicons from 'react-native-vector-icons/FontAwesome';
import IconFont from '../../components/Fonts/IconFont';
import AliIcon from '../../assets/AliIcon';
const { width, height } = Dimensions.get('window');
import HomeBanner from '../../components/Home/HomeBanner';
import OilTools from '../../components/Home/OilTools';
import Header from '../../components/Header/HeaderScreen';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            sourcePage: 'HomePage',
            title: '智慧油联',
            position: 'right',
            iconBarName: 'ditu'
        };
    }

    
    
    render () {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header title={this.state.title} firstColor={'#fa4546'} lastColor={'#ef0606'} iconBarName={this.state.iconBarName} position={this.state.position} />
                <HomeBanner navigation={this.props.navigation} sourcePage={this.state.sourcePage} />
                <OilTools navigation={this.props.navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        height: height
    }
});