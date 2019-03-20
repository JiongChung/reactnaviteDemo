import React,{Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text
} from 'react-native';
const { width, height } = Dimensions.get('window');

export default class AreaTools extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={[styles.areaHead,styles.areaHeads]}>
                    <View style={styles.headItem}>
                        <Text style={styles.text}>今日充值实付(元)</Text>
                        <Text style={styles.amount}>{this.props.areaTool.todayRecharge}</Text>
                    </View>
                    <View style={styles.headItem}>
                        <Text style={styles.text}>当月充值实付(元)</Text>
                        <Text style={styles.amount}>{this.props.areaTool.monthlyTotalRecharge}</Text>
                    </View>
                </View>
                <View style={styles.areaHead}>
                    <View style={styles.headItem}>
                        <Text style={styles.text}>今日区域奖励(元)</Text>
                        <Text style={styles.amount}>{this.props.areaTool.todayCommission}</Text>
                    </View>
                    <View style={styles.headItem}>
                        <Text style={styles.text}>当月区域奖励(元)</Text>
                        <Text style={styles.amount}>{this.props.areaTool.monthlyTotalCommission}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff881e',
        padding: 15,
        paddingTop: 0
    },
    areaHead: {
        flexDirection: 'row',
        paddingTop: 20
    },
    headItem: {
        flex: 1,
        alignItems: 'center'
    },
    areaHeads: {
        paddingTop: 0
    },
    text: {
        color: '#eee',
        fontSize: 12
    },
    amount: {
        color: 'white',
        fontSize: 30
    }
});