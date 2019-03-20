import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text
} from 'react-native';
const { width, height } = Dimensions.get('window');

export default class AssetsTools extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.tools}>
                    <Text style={styles.text}>资产总额</Text>
                    <Text style={styles.amount}>{this.props.tools.totalCoinValue}</Text>
                </View>
                <View style={styles.tools}>
                    <Text style={styles.text}>已激活</Text>
                    <Text style={styles.amount}>{this.props.tools.availableAmount}</Text>
                </View>
                <View style={styles.tools}>
                    <Text style={styles.text}>未激活</Text>
                    <Text style={styles.amount}>{this.props.tools.lockedAmount}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff881e',
        padding: 20,
        paddingTop: 0,
        flexDirection: 'row',
        paddingLeft: 0,
        paddingRight: 0
    },
    tools: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        color: '#eee',
        fontSize: 12
    },
    amount: {
        color: 'white',
        fontSize: 28
    }
})