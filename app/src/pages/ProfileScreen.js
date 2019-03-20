import React, { Component } from 'react'
import { Text, StyleSheet, View , Button} from 'react-native'

export default class ProfileScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            msg: ''
        };
    }
    _onPress = () => {
        // alert(JSON.stringify(this.props))
        this.setState({
            msg: 'Go to DetailsGo to DetailsGo to DetailsGo to Details'
        })
        this.props.navigation.navigate('Details',{name: this.state.msg});
        
    }
    render() {
        return (
        <View>
            <Button onPress={this._onPress} title="click me" />  
        </View>
        )
    }
}

const styles = StyleSheet.create({})
