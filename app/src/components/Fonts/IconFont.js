import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';

export default class IconFont extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text 
                style={[styles.icon, this.props.style]}
                onPress={this.props.onPress}   
            >
                {this.props.font}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        fontFamily:'iconfont',
        color: '#000',
    },
})