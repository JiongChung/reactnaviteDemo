import React, {Component} from 'react';
import { Text, StyleSheet, View} from 'react-native';

export default class ImmediateRechargeScreen extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation})=>({
        title: `${navigation.state.params.name}`,
        headerTitleStyle: {
            alignSelf: 'center',
            flex:1, 
            textAlign: 'center',
            color: 'white'
        },
        headerStyle: {
            backgroundColor: '#EE0000'
        },
        headerRight: <View />
    });

    render(){
        return(
            <View>
                <Text>ImmediateRecharge pages</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
});