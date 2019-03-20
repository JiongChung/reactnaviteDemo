import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import AliIcon from '../../../assets/AliIcon';

export default class CommissionTools extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.headerItem}>
                <Text style={styles.totalText}>{this.props.totalCommission}</Text>
                <Text style={styles.countText}>累计收入</Text>
                <View style={styles.headerToolsItem}>
                    <TouchableOpacity style={styles.headerTools} onPress={() => navigate('CommissionDetail',{name: '佣金明细'})}>
                        <AliIcon
                            name={'mingxi'}
                            size={30}
                            style={{color: '#fff'}}
                        />
                        <Text style={styles.toolsText}>佣金明细</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerTools} onPress={() => navigate('Withdraw',{name: '提现'})}>
                        <AliIcon
                            name={'tixian'}
                            size={30}
                            style={{color: '#fff'}}
                        />
                        <Text style={styles.toolsText}>提现</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerItem: {
        backgroundColor: '#ff881e',
        padding: 10,
        alignItems: 'center'
    },
    totalText: {
        fontSize: 54,
        color: 'white'
    },
    countText: {
        fontSize: 16,
        color: 'white'
    },
    headerToolsItem: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15
    },
    headerTools: {
        flex: 1,
        alignItems: 'center'
    },
    toolsText: {
        paddingTop: 5,
        color: 'white'
    }
})