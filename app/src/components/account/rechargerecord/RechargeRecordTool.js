import React, { Component } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text
} from 'react-native';
import BVLinearGraient from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');

export default class RechargeRecordTool extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <LinearGradient colors={['#FF5353','#ee0000']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                <View style={styles.toolsItem}>
                    <Text style={styles.saveAmount}>{this.props.totalInfo.totalSavedAmount}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.saveText}>已为你节省</Text>
                        <Text style={styles.saveSubText}>(元)</Text>
                    </View>
                </View>
                <View style={styles.userAssetsTools}>
                    <View style={styles.userAssetsList}>
                        <Text style={styles.userAssetsText}>总充值</Text>
                        <Text style={styles.userAssetsAmount}>{this.props.totalInfo.totalRechargeAmount}</Text>
                    </View>
                    <View style={styles.userAssetsList}>
                        <Text style={styles.userAssetsText}>总付款</Text>
                        <Text style={styles.userAssetsAmount}>{this.props.totalInfo.totalPayAmount}</Text>
                    </View>
                    <View style={styles.userAssetsList}>
                        <Text style={styles.userAssetsText}>已圈存</Text>
                        <Text style={styles.userAssetsAmount}>{this.props.totalInfo.totalLoadAmount}</Text>
                    </View>
                    <View style={styles.userAssetsList}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.saveText}>已激活</Text>
                            <Text style={styles.saveSubText}>(余额)</Text>
                        </View>
                        <Text style={styles.userAssetsAmount}>{this.props.totalInfo.totalActiveAmount}</Text>
                    </View>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    toolsItem: {
        padding: 20,
        alignItems: 'center'
    },
    toolsItemTitle: {
        color: 'white',
        fontSize: 16,
        paddingBottom: 20
    },
    saveAmount: {
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold'
    },
    saveText: {
        color: 'white',
        fontSize: 16,
        alignSelf: "flex-end"
    },
    saveSubText: {
        color: 'white',
        alignSelf: "flex-end",
        paddingLeft: 5
    },
    userAssetsTools: {
        padding: 20,
        flexDirection: 'row'
    },
    userAssetsList: {
        flex: 1,
        alignItems: 'center'
    },
    userAssetsText: {
        color: 'white',
        fontSize: 16
    },
    userAssetsAmount: {
        color: 'white',
        fontSize: 16,
        paddingTop: 5
    }
});